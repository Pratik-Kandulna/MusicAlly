import express from "express";
import { createPlaylist, getUserPlaylists } from "../controllers/playlistsController.js";
const router = express.Router();

// Create a new playlist
router.post("/create", createPlaylist);

router.get("/:userId", getUserPlaylists);

export default router;