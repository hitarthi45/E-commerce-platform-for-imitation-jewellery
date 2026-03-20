import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <div className="navbar">

      {/* LOGO */}
      <div className="logo">
        Imitation<span>Jewellery</span>
      </div>

      {/* MENU */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/category">Category</Link>
        <Link to="/product">Product</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/feedback">Feedback</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-actions">
        <button className="login-btn">Log In</button>
        <button className="signup-btn">Sign Up</button>
      </div>

    </div>
  );
}

export default Navbar;