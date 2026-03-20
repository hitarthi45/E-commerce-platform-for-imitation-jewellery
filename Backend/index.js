const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/rts_auth"));
app.use("/api/company", require("./routes/rts_company"));
app.use("/api/category", require("./routes/rts_category"));
app.use("/api/product", require("./routes/rts_product"));

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});