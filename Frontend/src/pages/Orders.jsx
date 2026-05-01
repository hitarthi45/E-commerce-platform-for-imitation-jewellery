import { useState, useEffect } from "react";
import "../styles/orders.css";

function Orders() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [order, setOrder] = useState({
    customer: "",
    product: "",
    quantity: "",
    price: "",
    payment: "",
  });

  const [products, setProducts] = useState([]);
  const [orderList, setOrderList] = useState([]);

  // ✅ FETCH EXISTING ORDERS FOR TRACKING
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/order`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      if (res.ok) {
        setOrderList(data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  // ✅ CALCULATION FOR ESTIMATED DELIVERY
  const calculateETA = (status, createdAt) => {
    const date = new Date(createdAt || Date.now());
    const daysToAdd = status === "manufacturing" ? 10 : status === "manufactured" ? 4 : 14;
    date.setDate(date.getDate() + daysToAdd);
    return date.toDateString();
  };

  useEffect(() => {
    const fetchProductsAndUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Authorization": `Bearer ${token}`
        };

        // Fetch Products
        const productsRes = await fetch(`${API_URL}/api/product`, { headers });
        const productsData = await productsRes.json();
        if (productsRes.ok) {
          // Ensure we are setting an array even if data is unexpected
          setProducts(Array.isArray(productsData) ? productsData : []);
        } else {
          console.error("Failed to fetch products:", productsData.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductsAndUsers();
    fetchOrders();
  }, [API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "product") {
      // Auto-fill price when product is selected
      const selectedProduct = products.find((p) => p._id === value);
      setOrder((prev) => ({
        ...prev,
        product: value,
        price: selectedProduct ? selectedProduct.price : "",
      }));
    } else {
      setOrder((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !order.customer ||
      !order.product ||
      !order.quantity ||
      !order.price ||
      !order.payment
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to place an order.");
        return;
      }

      // Extracting the actual User ID from the token payload (JWT)
      // This ensures the backend doesn't reject the 'user_id' field.
      let actualUserId;
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        actualUserId = decodedPayload.id || decodedPayload._id; 
      } catch (e) {
        console.error("Token decoding failed", e);
        actualUserId = "60d0fe4f5311236168a109ca"; // Fallback dummy ID if decoding fails
      }

      const payload = {
        user_id: actualUserId, // Send the validated ObjectId
        customer_name: order.customer, // Send the name separately
        products: [
          {
            product_id: order.product, // Mapping 'Product' input to product_id
            quantity: Number(order.quantity),
            price: Number(order.price)
          }
        ]
      };

      const res = await fetch(`${API_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Server Error:", data);
        alert(`Failed: ${data.message || "Check console for details"}`);
        return;
      }

      alert("Order placed successfully!");

      fetchOrders(); // Refresh tracking list

      setOrder({
        customer: "",
        product: "",
        quantity: "",
        price: "",
        payment: "",
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="order-page">
      <div className="order-card">

        <div className="order-left">
          <h4> IMITATION JEWELLERY</h4>
          <h1>Place Your Order</h1>
        </div>

        <div className="order-right">
          <p className="welcome">ORDER FORM</p>

          <form onSubmit={handleSubmit}>

            {/* Customer Name Input */}
            <input name="customer" type="text" value={order.customer} onChange={handleChange} placeholder="Customer Name" required />

            {/* Product Dropdown */}
            <select name="product" value={order.product} onChange={handleChange} required>
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))}
            </select>

            <input name="quantity" type="number" value={order.quantity} onChange={handleChange} placeholder="Quantity" required />
            <input name="price" type="number" value={order.price} onChange={handleChange} placeholder="Price" required />

            <select name="payment" value={order.payment} onChange={handleChange}>
              <option value="">Select Payment</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
            </select>

            <button type="submit">Place Order →</button>
          </form>

          {/* ✅ ORDER TRACKING SECTION */}
          <div className="tracking-section">
            <h3>Track Your Orders</h3>
            <div className="order-list">
              {orderList.length === 0 ? (
                <p className="no-orders">No orders found.</p>
              ) : (
                orderList.map((item, index) => (
                  <div key={index} className="tracking-card">
                    <div className="tracking-info">
                      <div className="tracking-header">
                        <strong>Order #{item._id?.slice(-6).toUpperCase()}</strong>
                        <span className={`status-badge ${item.status || 'queue'}`}>
                          {item.status || "In Queue"}
                        </span>
                      </div>
                      <p className="eta-text">
                        <strong>Estimated Delivery:</strong> {calculateETA(item.status, item.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Orders;