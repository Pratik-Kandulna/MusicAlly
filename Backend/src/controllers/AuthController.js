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
    id: user._id, 
    role: user.role, 
    name: user.name,
    email: user.email 
});
};

// LIKESONG
export const likeSong = async (req, res) => {
  try {
    const { userId, songId } = req.body;

    const user = await User.findById(userId);

    if (!user.likedSongs.includes(songId)) {
      user.likedSongs.push(songId);
      await user.save();
    }

    res.json({ message: "Song liked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//UNLIKESONG
export const unlikeSong = async (req, res) => {
  try {
    const { userId, songId } = req.body;

    await User.findByIdAndUpdate(userId, {
      $pull: { likedSongs: songId },
    });

    res.json({ message: "Song unliked" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//GET-FAVOURITES
export const getLikedSongs = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("likedSongs");

    res.json(user.likedSongs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};