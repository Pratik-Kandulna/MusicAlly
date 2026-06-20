import express from "express";
import { createPlaylist, getUserPlaylists, addSongToPlaylist, getPlaylistDetails, deletePlaylist, removeSongFromPlaylist, } from "../controllers/playlistsController.js";
const router = express.Router();

// Create a new playlist
router.post("/create", createPlaylist);

router.get("/details/:playlistId", getPlaylistDetails);

router.get("/:userId", getUserPlaylists);

router.post("/:playlistId/add-song", addSongToPlaylist);

router.delete("/:playlistId", deletePlaylist);

router.delete("/:playlistId/remove-song/:songId", removeSongFromPlaylist);


export default router;