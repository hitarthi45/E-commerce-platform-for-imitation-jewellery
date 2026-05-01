import { useState, useEffect } from "react";
import "../styles/inventory.css";

function Inventory() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [items, setItems] = useState([]);

  //  FETCH FROM BACKEND
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API_URL}/api/inventory`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        const formatted = data.map(item => ({
          name: item.product_id?.name,
          category: item.product_id?.category_id,
          price: item.product_id?.price,
          stock: item.quantity,
          product_id: item.product_id?._id,
          inventory_id: item._id, // ✅ Store the DB ID for updates
          status: item.status || "active" // ✅ Default to active
        }));

        setItems(formatted);
      })
      .catch(err => console.log(err));
  }, []);

  const getStatus = (stock, status) => {
    if (status === "inactive") return "Inactive";
    if (stock <= 5) return "Low";
    if (stock <= 10) return "Medium";
    return "In Stock";
  };

  // TOGGLE ACTIVE/INACTIVE (SOFT DELETE)
  const handleToggleStatus = async (index) => {
    const item = items[index];

    if (!item.inventory_id) {
      alert("Cannot update status: Inventory ID missing.");
      return;
    }

    const newStatus = item.status === "active" ? "inactive" : "active";

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/inventory/${item.inventory_id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        alert("Failed to update status");
        return;
      }

      const updatedItems = [...items];
      updatedItems[index].status = newStatus;
      setItems(updatedItems);
    } catch (err) {
      console.error(err);
      alert("Server error while updating status");
    }
  };

  const handleDelete = (index) => {
    alert("Note: Use the Deactivate button to archive. Delete is for permanent removal.");
  };

  const handleEdit = (index) => {
    alert("Edit functionality coming soon");
  };

  // 🔥 ADD INVENTORY (API CONNECTED)
  const handleAdd = async () => {
    const product_id = prompt("Enter Product ID:");
    const quantity = Number(prompt("Enter Quantity:"));

    if (!product_id || !quantity) {
      alert("Invalid input");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/inventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ product_id, quantity })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error updating inventory");
        return;
      }

      alert("Inventory updated successfully!");

      // 🔄 Refresh data
      fetch(`${API_URL}/api/inventory`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          const formatted = data.map(item => ({
            name: item.product_id?.name,
            category: item.product_id?.category_id,
            price: item.product_id?.price,
            stock: item.quantity,
            product_id: item.product_id?._id,
            inventory_id: item._id,
            status: item.status || "active"
          }));

          setItems(formatted);
        });

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="inventory-page">

      {/* HEADER */}
      <div className="inventory-header">
        <h2>Inventory Management</h2>
        <button className="add-btn" onClick={handleAdd}>
          + Add Product
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="inventory-card">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="product-name">{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>{item.stock}</td>

                <td>
                  <span className={`status ${getStatus(item.stock, item.status).toLowerCase().replace(" ", "-")}`}>
                    {getStatus(item.stock, item.status)}
                  </span>
                </td>

                <td className="actions">
                  <button
                    className={item.status === "active" ? "deactivate-btn" : "activate-btn"}
                    onClick={() => handleToggleStatus(index)}
                  >
                    {item.status === "active" ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Inventory;