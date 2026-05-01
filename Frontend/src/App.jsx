import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Production from "./pages/Production";
import Inventory from "./pages/inventory";
import Feedback from "./pages/feedback";
import Login from "./pages/login";
import Register from "./pages/register";
import Orders from "./pages/Orders";


import "./App.css";

function App() {
  return (
    <Router>

      {/* NAVBAR ALWAYS ON TOP */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="page">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/production" element={<Production />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;