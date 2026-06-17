import Playlist from "../models/Playlist.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, userId } = req.body;

    if (!name || !userId) {
      return res.status(400).json({
        message: "Playlist name and userId are required",
      });
    }

    const playlist = await Playlist.create({
      name,
      user: userId,
      songs: [],
    });

    res.status(201).json(playlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create playlist",
    });
  }
};

export const getUserPlaylists = async (req, res) => {
  try {
    const { userId } = req.params;

    const playlists = await Playlist.find({
      user: userId,
    }).populate("songs");

    res.status(200).json(playlists);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch playlists",
    });
  }
};
