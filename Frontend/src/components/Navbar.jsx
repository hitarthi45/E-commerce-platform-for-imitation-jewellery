import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="logo">
        Imitation<span>Jewellery</span>
      </div>

      {/* MENU */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Production">Production</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/orders">Orders</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-actions">
        {!token ? (
          <>
            <Link to="/login">
              <button className="login-btn">Log In</button>
            </Link>
            <Link to="/register">
              <button className="signup-btn">Sign Up</button>
            </Link>
          </>
        ) : (
          <div className="nav-user">
            <div className="profile-icon">
              <svg viewBox="0 0 24 24" fill="none" width="28" height="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

export default Navbar;