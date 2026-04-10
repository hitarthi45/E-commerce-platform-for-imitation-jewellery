import { useState, useEffect } from "react";
import "../styles/inventory.css";

function Inventory() {
  const [items, setItems] = useState([
    { name: "Studs", category: "Earrings", price: 499, stock: 5 },
    { name: "Jhumkas", category: "Earrings", price: 899, stock: 20 },
    { name: "Chains", category: "Necklace", price: 999, stock: 8 },
    { name: "Raani Haar", category: "Necklace", price: 2999, stock: 2 },
    { name: "Payal", category: "Anklets", price: 499, stock: 6 },
    { name: "Anklet chain", category: "Anklets", price: 699, stock: 5 },
    { name: "Kadas", category: "Bangles", price: 599, stock: 12 },
    { name: "Bracelets", category: "Bangles", price: 899, stock: 3 },
  ]);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/inventory")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          name: item.product_id?.name,
          category: item.product_id?.category_id,
          price: item.product_id?.price,
          stock: item.quantity,
          product_id: item.product_id?._id
        }));

        setItems(formatted);
      })
      .catch(err => console.log(err));
  }, []);

  const getStatus = (stock) => {
    if (stock <= 5) return "Low";
    if (stock <= 10) return "Medium";
    return "In Stock";
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
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
      const res = await fetch("http://localhost:5000/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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
      fetch("http://localhost:5000/api/inventory")
        .then(res => res.json())
        .then(data => {
          const formatted = data.map(item => ({
            name: item.product_id?.name,
            category: item.product_id?.category_id,
            price: item.product_id?.price,
            stock: item.quantity,
            product_id: item.product_id?._id
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
                  <span className={`status ${getStatus(item.stock).toLowerCase()}`}>
                    {getStatus(item.stock)}
                  </span>
                </td>

                <td className="actions">
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