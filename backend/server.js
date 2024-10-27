require("dotenv").config();

const express = require("express");
const { connectDB } = require("./config/db");
const productRouter = require("../backend/routes/product.route");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();

app.use(cors());

app.use(express.json());
app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend/dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
