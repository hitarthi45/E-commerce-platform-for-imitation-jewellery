import { useState } from "react";
import "../styles/orders.css";

function Orders() {
  const [order, setOrder] = useState({
    customer: "",
    product: "",
    quantity: "",
    price: "",
    payment: "",
  });

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
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
      // ✅ CONVERT TO BACKEND FORMAT
      const payload = {
  user_id: "69bcb7d6a883d8884bf5a6b8",
  products: [
    {
      product_id: "69bcb7d6a883d8884bf5a6b9", // must be ANY valid ObjectId
      quantity: 1,
      price: 100
    }
  ]
};

      const res = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      alert("Order placed successfully!");

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

            <input name="customer" value={order.customer} onChange={handleChange} placeholder="Customer" />
            <input name="product" value={order.product} onChange={handleChange} placeholder="Product" />
            <input name="quantity" value={order.quantity} onChange={handleChange} placeholder="Quantity" />
            <input name="price" value={order.price} onChange={handleChange} placeholder="Price" />

            <select name="payment" value={order.payment} onChange={handleChange}>
              <option value="">Select Payment</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
            </select>

            <button type="submit">Place Order →</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Orders;