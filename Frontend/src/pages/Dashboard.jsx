import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const data = [
    { title: "Total Products", value: 120 },
    { title: "Categories", value: 10 },
    { title: "Low Stock", value: 5 },
  ];

  // ✅ Carousel Images
  const images = [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
  ];

  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // GRAPH DATA (UNCHANGED)
  const categoryData = [
    { name: "Earrings", value: 40 },
    { name: "Necklace", value: 30 },
    { name: "Bangles", value: 25 },
    { name: "Anklets", value: 15 },
  ];

  const salesData = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 700 },
    { month: "Mar", sales: 500 },
    { month: "Apr", sales: 900 },
    { month: "May", sales: 600 },
  ];

  return (
    <div className="home">

      {/* 🔥 CAROUSEL BANNER */}
      <div className="banner">
        <img src={images[index]} alt="banner" className="banner-img" />

        <div className="banner-content">
          <h1>Trendy and Creative</h1>
          <h2>Jewellery For Every Occasion</h2>
        </div>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="dashboard-section">
        <h2>Dashboard Overview</h2>

        <div className="dashboard-cards">
          {data.map((item, index) => (
            <div className="dashboard-card" key={index}>
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 GRAPHS (UNCHANGED) */}
      <div className="charts-section">

        <div className="chart-card">
          <h3>Products by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Sales Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;