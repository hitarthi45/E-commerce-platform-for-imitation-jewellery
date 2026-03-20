import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
// import Category from "./pages/Category";
// import Product from "./pages/Product";
// import Inventory from "./pages/Inventory";
// import Feedback from "./pages/Feedback";

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
          {/* <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/feedback" element={<Feedback />} /> */}
        </Routes>
      </div>

    </Router>
  );
}

export default App;