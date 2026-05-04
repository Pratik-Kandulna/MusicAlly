import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    res.json({
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ message: "Register failed" });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json("Wrong password");

  const token = jwt.sign(
    { 
        id: user._id, 
        role: user.role 
    },
    "secret123"
  );

  res.json({ 
    token, 
    role: user.role, 
    name: user.name,
    email: user.email 
});
};