import { useState, useEffect } from "react";
import "../styles/category.css";

function Category() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [categories, setCategories] = useState([
    { name: "Necklace", description: "Elegant neck jewellery" },
    { name: "Earrings", description: "Stylish ear accessories" },
    { name: "Anklets", description: "Traditional foot jewellery" },
    { name: "Bangles", description: "Beautiful wrist ornaments" },
  ]);

  // ✅ Background Images Mapping
  const categoryImages = {
    Earrings: "https://images.unsplash.com/photo-1693212793204-bcea856c75fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWFycmluZ3N8ZW58MHx8MHx8fDA%3D",
    Necklace: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
    Bangles: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Anklets: "https://images.unsplash.com/photo-1651395835317-d2868e8ebcac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5rbGV0c3xlbnwwfHwwfHx8MA%3D%3D",
  };

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
  });

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetch(`${API_URL}/api/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInput((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ ADD CATEGORY
  const handleAdd = async (e) => {
    e.preventDefault();
    
    console.log("Adding category with input:", input); // Debugging: Log input before sending
    if (!input.name || !input.description) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      console.log("Category added response data:", data); // Debugging: Log response from backend

      if (!res.ok) {
        alert(data.error || "Error adding category");
        return;
      }

      setCategories([...categories, data]);

      setInput({ name: "", description: "", image: "" });
      setShowForm(false);
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="page-container">

      
      {/* HEADER */}
      <div className="page-header">
        <h2>Category Management</h2>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search categories..."
            style={{ width: "250px", margin: "0", padding: "10px 15px", borderRadius: "25px", border: "1px solid #ddd", fontSize: "14px", backgroundColor: "white", color: "#333" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close" : "+ Add New"}
          </button>
        </div>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="form-section">
          <h3>Add Category</h3>

          <form className="form-box" onSubmit={handleAdd}>
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={input.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={input.description}
              onChange={handleChange}
            />

            <div className="image-input-wrapper" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="text"
                name="image"
                placeholder="Paste Image Link"
                value={input.image}
                onChange={handleChange}
              />
              <p style={{ margin: "0", fontSize: "12px", color: "#666", textAlign: "center" }}>— OR —</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ fontSize: "12px" }}
              />
            </div>
            
            {input.image && (
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <p style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>Image Preview:</p>
                <img src={input.image} alt="Image Preview" style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "cover", border: "1px solid #ddd" }} />
              </div>
            )}


            <button>Add Category</button>
          </form>
        </div>
      )}

{/* ✅ CATEGORY CARDS */}
      <div className="category-cards">
        {categories.filter(c => 
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          c.description.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((cat, index) => {
          // Case-insensitive lookup for hardcoded images
          const categoryKey = Object.keys(categoryImages).find(k => k.toLowerCase() === cat.name.toLowerCase());
          const bgImage = cat.image || categoryImages[categoryKey];

          return (
            <div
              key={index}
              className="category-card"
              style={{
                backgroundImage: bgImage ? `url(${bgImage})` : "none",
                backgroundColor: bgImage ? "transparent" : "#e0e0e0", // Light grey if blank
                border: bgImage ? "none" : "1px dashed #ccc"
              }}
          >
            <div className="card-overlay">
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;