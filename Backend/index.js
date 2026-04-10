const express = require("express");
const connectDB = require("./config/db");

const app = express();
const cors = require("cors");
// Middleware
app.use(express.json());
app.use(cors());
// DB Connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/rts_auth"));
app.use("/api/company", require("./routes/rts_company"));
app.use("/api/category", require("./routes/rts_category"));
app.use("/api/product", require("./routes/rts_product"));
app.use("/api/inventory", require("./routes/rts_inventory"));
app.use("/api/feedback", require("./routes/rts_feedback"));
app.use("/api/order", require("./routes/rts_orders"));

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});