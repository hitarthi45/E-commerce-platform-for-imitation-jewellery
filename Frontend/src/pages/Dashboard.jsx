import { useState } from "react";
import "../styles/dashboard.css";

function Dashboard() {
  const [activeCard, setActiveCard] = useState(null);

  const data = [
    { title: "Total Products", value: 120, icon: "📦" },
    { title: "Categories", value: 10, icon: "📂" },
    { title: "Low Stock", value: 5, icon: "⚠️" },
  ];

  return (
    <div className="home">

      {/* BANNER */}
      <div className="banner">
        <div className="banner-content">
          <h1>Trendy and Creative</h1>
          <h2>Jewellery For Every Occasion</h2>
        </div>
      </div>

      {/* DASHBOARD */}
      <div className="dashboard-section">
        <h2>Dashboard Overview</h2>

        <div className="cards">
          {data.map((item, index) => (
            <div
              key={index}
              className={`card ${activeCard === index ? "active" : ""}`}
              onClick={() => setActiveCard(index)}
            >
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;