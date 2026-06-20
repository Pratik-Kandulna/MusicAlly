import Song from "../models/songModel.js";
export const createSong = async (req, res) => {
  try {
    const { title, artist, genre, album } = req.body;


        {/**********-EXISTING-SONG-CHECK-************/}
    const existing = await Song.findOne({ title, artist });

    if (existing) {
    return res.status(400).json({ message: "Song already exists" });
    }

    


        {/**************-SONG-CREATE-**************/}
    const song = await Song.create({
    title,
    artist,
    genre: genre?.toLowerCase() || "unknown",
    album: album || null,

  audioUrl: req.files?.audio?.[0]?.path,
  coverImage: req.files?.cover?.[0]?.path,
});
    res.status(201).json(song);

  } catch (error) {
    console.log(error);
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    res.status(500).json({ message: error.message });
  }

    
  
};

export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteSong = async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: "Song deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementPlays = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { $inc: { plays: 1 } },
      { new: true }
    );

    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};