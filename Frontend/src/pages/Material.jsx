import { useState } from "react";
import "../styles/material.css";

function Material() {
  const [materials, setMaterials] = useState([
    { name: "Gold Plating", type: "Metal", cost: 500, stock: 20 },
    { name: "Pearls", type: "Beads", cost: 200, stock: 8 },
    { name: "Stones", type: "Gem", cost: 300, stock: 5 },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [input, setInput] = useState({
    name: "",
    type: "",
    cost: "",
    stock: "",
  });

  const getStatus = (stock) => {
    if (stock <= 5) return "Low";
    if (stock <= 10) return "Medium";
    return "Available";
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!input.name || !input.type || !input.cost || !input.stock) {
      alert("Fill all fields");
      return;
    }

    setMaterials([...materials, input]);
    setInput({ name: "", type: "", cost: "", stock: "" });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="page-header">
        <h2>Material Management</h2>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Add Material"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="form-section">
          <h3>Add Material</h3>

          <form onSubmit={handleAdd} className="form-box">
            <input
              type="text"
              name="name"
              placeholder="Material Name"
              value={input.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="type"
              placeholder="Type (Metal, Beads, etc.)"
              value={input.type}
              onChange={handleChange}
            />

            <input
              type="number"
              name="cost"
              placeholder="Cost"
              value={input.cost}
              onChange={handleChange}
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={input.stock}
              onChange={handleChange}
            />

            <button>Add</button>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="material-table">
        <table>
          <thead>
            <tr>
              <th>Material</th>
              <th>Type</th>
              <th>Cost (₹)</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {materials.map((mat, index) => (
              <tr key={index}>
                <td>{mat.name}</td>
                <td>{mat.type}</td>
                <td>₹{mat.cost}</td>
                <td>{mat.stock}</td>

                <td>
                  <span
                    className={`status ${
                      mat.stock <= 5
                        ? "low"
                        : mat.stock <= 10
                        ? "medium"
                        : "active"
                    }`}
                  >
                    {getStatus(mat.stock)}
                  </span>
                </td>

                <td>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>
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

export default Material;