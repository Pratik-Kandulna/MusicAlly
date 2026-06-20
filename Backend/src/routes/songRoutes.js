import express from "express";
import upload from "../config/multer.js";
import {
  createSong,
  getSongs,
  deleteSong,
  incrementPlays,
} from "../controllers/songController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  createSong
);
router.get("/", getSongs);
router.put("/play/:id", incrementPlays);
router.delete("/:id", deleteSong);


export default router;