import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.firstName + " " + form.lastName,
        email: form.email,
        password: form.password,
        role: form.role,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Register failed");
      return;
    }

    alert("Registered successfully");
    navigate("/login");

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};

  return (
    <div className="auth-container register-page">
      <div className="auth-card">

        {/* LEFT PANEL */}
        <div className="auth-left">
          <div className="auth-brand">
            <div className="auth-gem">
              <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
                <path
                  d="M12 2L15 8H21L16.5 12.5L18.5 19L12 15.5L5.5 19L7.5 12.5L3 8H9L12 2Z"
                  fill="white" opacity="0.9"
                />
              </svg>
            </div>
            <div>
              <p className="auth-brand-sub">Imitation Jewellery</p>
            </div>
          </div>

          <div className="auth-left-content">
            <h1>Join a platform built for jewellery makers.</h1>
            <div className="auth-left-divider" />
            <p>
              Set up your account in seconds and start managing
              your production, inventory and sales today.
            </p>
          </div>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature-dot" />
              <span>Free to get started</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-dot" />
              <span>Built for manufacturers &amp; retailers</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-dot" />
              <span>Real-time stock &amp; batch tracking</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">
          <p className="auth-eyebrow">Get started</p>
          <h2>Create your account</h2>
          <p className="auth-subtitle">Join the platform in seconds</p>

          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First name</label>
                <input
                  className="form-input"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Priya"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last name</label>
                <input
                  className="form-input"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Shah"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <input
                className="form-input"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                className="form-input"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="role">Role</label>
              <select
                className="form-input"
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="">Select your role</option>
                <option value="admin">Admin</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="retailer">Retailer</option>
              </select>
            </div>

            <button className="auth-btn" type="submit">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="#1a1208" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              Create Account
            </button>

            <p className="auth-footer-text">
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;