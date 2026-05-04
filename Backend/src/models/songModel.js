import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    artist: {
      type: String,
      required: true,
    },

    album: {
      type: String,
      default: null,
    },

    genre: {
      type: String,
      default: "",
      required: true,
    },

    coverImage: {
      type: String, // image path or URL
      default: "",
    },

    audioUrl: {
      type: String, // audio file path
      required: true,
    },

    releaseDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // later use
    },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);

export default Song;