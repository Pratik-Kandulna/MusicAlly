import express from "express";
import connectDB from "./config/db.js";
import songRoutes from "./routes/songRoutes.js";
import cors from "cors";
import path from "path";


const app = express();   // ✅ FIRST

app.use(cors());
app.use(express.json());

app.use("/api/songs", songRoutes);
app.use("/uploads", express.static(path.resolve("uploads")));

// connect database
connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});