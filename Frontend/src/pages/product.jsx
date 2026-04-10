import { useState, useEffect } from "react";
import "../styles/product.css";

function Product() {
  const [products, setProducts] = useState([
    { name: "Studs", price: 499, category: "Earrings" },
    { name: "Jhumkas", price: 899, category: "Earrings" },
    { name: "Chandbalis", price: 1299, category: "Earrings" },
    { name: "Danglers", price: 799, category: "Earrings" },

    { name: "Chains", price: 999, category: "Necklace" },
    { name: "Pendants", price: 699, category: "Necklace" },
    { name: "Full Set", price: 1999, category: "Necklace" },
    { name: "Raani Haar", price: 2999, category: "Necklace" },

    { name: "Kadas", price: 599, category: "Bangles" },
    { name: "Chudis", price: 399, category: "Bangles" },
    { name: "Bracelets", price: 899, category: "Bangles" },
    { name: "Armlets", price: 1499, category: "Bangles" },

    { name: "Payal", price: 499, category: "Anklets" },
    { name: "Toe Rings", price: 199, category: "Anklets" },
    { name: "Anklet Chains", price: 699, category: "Anklets" },
    { name: "Anklet Sets", price: 1299, category: "Anklets" },
  ]);

  const [categories, setCategories] = useState([]); // 🔥 NEW

  const [showForm, setShowForm] = useState(false);

  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
  });

  // 🔥 FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/product")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(p => ({
          name: p.name,
          price: p.price,
          category: p.category_id?.name
        }));
        setProducts(formatted);
      })
      .catch(err => console.log(err));
  }, []);

  // 🔥 FETCH CATEGORIES
  useEffect(() => {
    fetch("http://localhost:5000/api/category")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!input.name || !input.price || !input.category) {
      alert("Fill all fields");
      return;
    }

    try {
      // 🔥 FIND CATEGORY ID FROM NAME
      const selectedCategory = categories.find(
        (cat) => cat.name === input.category
      );

      if (!selectedCategory) {
        alert("Category not found in DB");
        return;
      }

      const payload = {
        name: input.name,
        price: Number(input.price),
        category_id: selectedCategory._id
      };

      const res = await fetch("http://localhost:5000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error adding product");
        return;
      }

      // ✅ KEEP YOUR ORIGINAL LOGIC
      setProducts([...products, input]);

      setInput({ name: "", price: "", category: "" });
      setShowForm(false);

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <h2>Product Management</h2>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "+ Add New"}
        </button>
      </div>

      {showForm && (
        <div className="form-section">
          <h3>Add Product</h3>

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
        </div>
      )}

      <div className="list">
        {products.length === 0 ? (
          <p>No products yet</p>
        ) : (
          products.map((prod, index) => (
            <div className="list-item" key={index}>
              <h4>{prod.name}</h4>
              <p>₹{prod.price} | {prod.category}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Product;