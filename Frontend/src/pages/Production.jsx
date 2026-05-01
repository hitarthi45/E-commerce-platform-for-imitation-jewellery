import { useState } from "react";
import Category from "./category";
import Product from "./product";
import Material from "./Material";
import "../styles/production.css";

function Production() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="page-header">
        <div className="header-left">
          <div className="header-logo">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <path
                d="M12 2L15 8H21L16.5 12.5L18.5 19L12 15.5L5.5 19L7.5 12.5L3 8H9L12 2Z"
                fill="white"
                opacity="0.9"
              />
            </svg>
          </div>

          <div>
            <h2 className="header-title">Production Management</h2>
            <p className="header-subtitle">Imitation Jewellery</p>
          </div>
        </div>

        <span className="header-badge">Manufacturer & Retailer</span>
      </div>

      <div className="page-body">

        {/* ================= CARDS ================= */}
        {activeSection === "" && (
          <>
            <p className="section-label">Management Modules</p>

            <div className="production-cards">

              {/* CATEGORY */}
              <div
                className="production-card"
                onClick={() => setActiveSection("category")}
              >
                <div className="card-icon gold"></div>

                <div className="card-content">
                  <h3 className="card-title">Category</h3>
                  <p className="card-desc">
                    Organise jewellery types — necklace, earrings, bangles
                  </p>
                </div>
              </div>

              {/* PRODUCT */}
              <div
                className="production-card"
                onClick={() => setActiveSection("product")}
              >
                <div className="card-icon gold"></div>

                <div className="card-content">
                  <h3 className="card-title">Products</h3>
                  <p className="card-desc">
                    Manage all jewellery items, pricing & stock
                  </p>
                </div>
              </div>

              {/* MATERIAL */}
              <div
                className="production-card"
                onClick={() => setActiveSection("materials")}
              >
                <div className="card-icon silver"></div>

                <div className="card-content">
                  <h3 className="card-title">Materials</h3>
                  <p className="card-desc">
                    Track raw materials like metal, stones, beads
                  </p>
                </div>
              </div>

            </div>
          </>
        )}

        {/* ================= CATEGORY ================= */}
        {activeSection === "category" && (
          <div>
            <div className="back-bar">
              <button className="back-btn" onClick={() => setActiveSection("")}>
                ⬅ Back
              </button>

              <span className="breadcrumb">
                Production › <strong>Category</strong>
              </span>
            </div>

            <Category />
          </div>
        )}

        {/* ================= PRODUCT ================= */}
        {activeSection === "product" && (
          <div>
            <div className="back-bar">
              <button className="back-btn" onClick={() => setActiveSection("")}>
                ⬅ Back
              </button>

              <span className="breadcrumb">
                Production › <strong>Products</strong>
              </span>
            </div>

            <Product />
          </div>
        )}

        {/* ================= MATERIAL ================= */}
        {activeSection === "materials" && (
          <div>
            <div className="back-bar">
              <button className="back-btn" onClick={() => setActiveSection("")}>
                ⬅ Back
              </button>

              <span className="breadcrumb">
                Production › <strong>Materials</strong>
              </span>
            </div>

            <Material />
          </div>
        )}

      </div>
    </div>
  );
}

export default Production;