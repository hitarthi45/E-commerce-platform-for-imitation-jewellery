import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ Save token
    localStorage.setItem("token", data.token);

    console.log("Login Success:", data);

    // ✅ Redirect
    navigate("/");

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};

  return (
    <div className="auth-container login-page">
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
            <h1>Crafted with care,<br />worn with pride.</h1>
            <div className="auth-left-divider" />
            <p>
              Manage your entire jewellery production and retail
              operation from one elegant platform.
            </p>
          </div>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature-dot" />
              <span>Full production management</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-dot" />
              <span>Inventory &amp; stock tracking</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-dot" />
              <span>Manufacturer &amp; retailer tools</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-right">
          <p className="auth-eyebrow">Welcome back</p>
          <h2>Sign in to your account</h2>
          <p className="auth-subtitle">Enter your credentials to continue</p>

          <form className="auth-form" onSubmit={handleSubmit}>

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

            <button className="auth-btn" type="submit">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="#1a1208" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              Sign In
            </button>

            <p className="auth-footer-text">
              Don't have an account?{" "}
              <Link to="/register">Register here</Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;