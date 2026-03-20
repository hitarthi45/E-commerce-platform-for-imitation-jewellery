import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div className="home">

      {/* HERO IMAGE SECTION */}
      <div className="banner">
        <div className="banner-content">
          <h1>Adorn Yourself With</h1>
          <h2>Beautiful Jewellery</h2>
          <p>Discover elegance in every piece</p>
        </div>
      </div>

      {/* REST CONTENT */}
      <div className="dashboard-section">
        <h2>Dashboard Overview</h2>
        <div className="cards">
          <div className="card">Total Products: 120</div>
          <div className="card">Categories: 10</div>
          <div className="card">Low Stock: 5</div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;