import express from "express";
import connectDB from "./config/db.js";

const app = express();

// connect database
connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});