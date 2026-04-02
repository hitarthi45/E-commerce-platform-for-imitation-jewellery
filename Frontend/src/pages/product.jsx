import { useState } from "react";
import "../styles/product.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!input.name || !input.price || !input.category) {
      alert("Fill all fields");
      return;
    }

    setProducts([...products, input]);
    setInput({ name: "", price: "", category: "" });
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  return (
    <div className="page-container">
      <h2>Product Management</h2>

      {/* FORM */}
      <form className="form-box" onSubmit={handleAdd}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={input.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={input.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={input.category}
          onChange={handleChange}
        />

        <button>Add Product</button>
      </form>

      {/* LIST */}
      <div className="list">
        {products.length === 0 ? (
          <p>No products added</p>
        ) : (
          products.map((prod, index) => (
            <div className="list-item" key={index}>
              <div>
                <h4>{prod.name}</h4>
                <p>₹{prod.price} | {prod.category}</p>
              </div>

              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Product;