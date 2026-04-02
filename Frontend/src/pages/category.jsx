import { useState } from "react";
import "../styles/category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!input.name || !input.description) {
      alert("Fill all fields");
      return;
    }

    setCategories([...categories, input]);
    setInput({ name: "", description: "" });
  };

  const handleDelete = (index) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };

  return (
    <div className="page-container">
      <h2>Category Management</h2>

      {/* FORM */}
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

      {/* LIST */}
      <div className="list">
        {categories.length === 0 ? (
          <p>No categories added</p>
        ) : (
          categories.map((cat, index) => (
            <div className="list-item" key={index}>
              <div>
                <h4>{cat.name}</h4>
                <p>{cat.description}</p>
              </div>

              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Category;