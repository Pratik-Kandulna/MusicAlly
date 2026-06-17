import express from "express";
import {
  register,
  login,
  likeSong,
  unlikeSong,
  getLikedSongs,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/like", likeSong);
router.post("/unlike", unlikeSong);
router.get("/favourites/:userId", getLikedSongs);

export default router;