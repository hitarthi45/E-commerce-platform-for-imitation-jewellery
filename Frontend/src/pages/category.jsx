import { useState, useEffect } from "react";
import "../styles/category.css";

function Category() {
  const [categories, setCategories] = useState([
    { name: "Necklace", description: "Elegant neck jewellery" },
    { name: "Earrings", description: "Stylish ear accessories" },
    { name: "Anklets", description: "Traditional foot jewellery" },
    { name: "Bangles", description: "Beautiful wrist ornaments" },
  ]);

  // ✅ Background Images Mapping
  const categoryImages = {
    Earrings: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
    Necklace: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D",
    Bangles: "https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Anklets: "https://images.unsplash.com/photo-1651395835317-d2868e8ebcac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5rbGV0c3xlbnwwfHwwfHx8MA%3D%3D",
  };

  const [showForm, setShowForm] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
  });

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // ✅ ADD CATEGORY
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!input.name || !input.description) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error adding category");
        return;
      }

      setCategories([...categories, data]);

      setInput({ name: "", description: "" });
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

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Add New"}
        </button>
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

            <button>Add Category</button>
          </form>
        </div>
      )}

{/* ✅ CATEGORY CARDS */}
      <div className="category-cards">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-card"
            style={{
              backgroundImage: `url(${
                categoryImages[cat.name] ||
                "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"
              })`,
            }}
          >
            <div className="card-overlay">
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}

export default Category;