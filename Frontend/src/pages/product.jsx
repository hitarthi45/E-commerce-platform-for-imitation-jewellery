import { useState } from "react";
import "../styles/product.css";

function Product() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [products, setProducts] = useState([
    // Earrings
    { name: "Jhumkas", price: 899, category: "Earrings" },
    { name: "Chandbalis", price: 1299, category: "Earrings" },

    // Necklaces
    { name: "Chains", price: 999, category: "Necklace" },
    { name: "Pendants", price: 699, category: "Necklace" },

    // Bangles
    { name: "Kadas", price: 599, category: "Bangles" },
    { name: "Bracelets", price: 899, category: "Bangles" },

    // Anklets
    { name: "Payal", price: 499, category: "Anklets" },
    { name: "Toe Rings", price: 199, category: "Anklets" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
  });

  // ✅ PRODUCT IMAGE MAP
  const productImages = {
    Jhumkas: "https://images.unsplash.com/photo-1714733831162-0a6e849141be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amh1bWthfGVufDB8fDB8fHww",
    Chandbalis: "https://media.istockphoto.com/id/1466950968/photo/artifical-jewllary.webp?a=1&b=1&s=612x612&w=0&k=20&c=eA0UOPlxvjUCFbL9N7qmuosfdG9-nwe5EsiYacC-mQw=",

    Chains: "https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D",
    Pendants: "https://plus.unsplash.com/premium_photo-1681276169450-4504a2442173?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVuZGFudHN8ZW58MHx8MHx8fDA%3D",

    Kadas: "https://images.unsplash.com/photo-1679156272446-30738eb5c4e7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFuZCUyMGthZGF8ZW58MHx8MHx8fDA%3D",
    Bracelets: "https://images.unsplash.com/photo-1692421098809-6cdfcfea289a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJyYWNlbGV0c3xlbnwwfHwwfHx8MA%3D%3D",

    Payal: "https://images.unsplash.com/photo-1599799045747-9dbfcfef6b97?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Toe Rings":
      "https://plus.unsplash.com/premium_photo-1679243794157-fb9220aee0af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VG9lJTIwcmluZ3MlMjBpbiUyMGpld2VsbGVyeSUyMGZvcm18ZW58MHx8MHx8fDA%3D",
  };

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
    setInput({ name: "", price: "", category: "", image: "" });
    setShowForm(false);
  };

  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="page-header">
        <h2>Product Management</h2>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search products..."
            className="form-input"
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

            <div className="image-input-wrapper" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="text"
                name="image"
                placeholder="Paste Image Link"
                value={input.image}
                onChange={handleChange}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <button>Add Product</button>
          </form>
        </div>
      )}

      {/* LIST */}
      <div className="list">
        {products.filter(p => 
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 ? (
          <p>No products yet</p>
        ) : (
          products
            .filter(p => 
              p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
              p.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((prod, index) => (
            <div
              className="list-item product-card"
              key={index}
              style={{
                backgroundImage: `url(${
                  productImages[prod.name] ||
                  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"
                })`,
              }}
            >
              <div className="product-overlay">
                <h4>{prod.name}</h4>
                <p>
                  ₹{prod.price} | {prod.category}
                </p>
              </div>
            </div>
          ))
            .map((prod, index) => {
              const productKey = Object.keys(productImages).find(k => k.toLowerCase() === prod.name.toLowerCase());
              const bgImage = prod.image || productImages[productKey];

              return (
                <div
                  className="list-item product-card"
                  key={index}
                  style={{
                    backgroundImage: bgImage ? `url(${bgImage})` : "none",
                    backgroundColor: bgImage ? "transparent" : "#f5f5f5",
                    border: bgImage ? "none" : "1px dashed #ddd"
                  }}
                >
                  <div className="product-overlay">
                    <h4>{prod.name}</h4>
                    <p>
                      ₹{prod.price} | {prod.category}
                    </p>
                  </div>
                </div>
              );
            })
        )}
      </div>

    </div>
  );
}

export default Product;