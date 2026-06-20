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

export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { songId } = req.body;

    console.log("playlistId from URL:", playlistId);
    console.log("songId from body:", songId);
    

    console.log("Model collection:", Playlist.collection.name);

    const allPlaylists = await Playlist.find();

    console.log("All playlists:", allPlaylists);

    const playlist = await Playlist.findById(playlistId);
    console.log("Playlist found:", playlist);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Prevent duplicates
    if (!playlist.songs.some(id => id.toString() === songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.status(200).json(playlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add song to playlist",
    });
  }
};

export const getPlaylistDetails = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const playlist = await Playlist.findById(playlistId).populate("songs");

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    res.status(200).json(playlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch playlist details",
    });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;

    await Playlist.findByIdAndDelete(playlistId);

    res.json({ message: "Playlist deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to delete playlist",
    });
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.songs = playlist.songs.filter(
      (id) => id.toString() !== songId
    );

    await playlist.save();

    res.json({
      message: "Song removed successfully",
      playlist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to remove song",
    });
  }
};
