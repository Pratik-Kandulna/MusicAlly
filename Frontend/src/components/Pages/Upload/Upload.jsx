import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Upload.css";

function Upload() {
const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState(null);
  const [audio, setAudio] = useState(null);
  const [genre, setGenre] = useState("");
  const [album, setAlbum] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
     console.log("Upload clicked");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("cover", cover);
    formData.append("audio", audio);
    formData.append("genre", genre);
    formData.append("album", album);

    if (!cover || !audio) {
  alert("Please select files");
  return;
}

    try {
      const res = await fetch("http://localhost:3000/api/songs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setSongs((prev) => prev.filter((song) => song._id !== id));

        console.log("SERVER ERROR:", data);
        throw new Error(data.message || "Upload failed");
      }

console.log(data);
alert("Song Uploaded ✅");
navigate("/Dashboard", { state: { refresh: true } }); 

      // reset
      setTitle("");
      setArtist("");
      setCover(null);
      setAudio(null);
      setGenre("");
      setAlbum(null);

    } catch (err) {
      console.log("UPLOAD ERROR:", err);
      alert("Upload failed ❌");
    }
  };

  




  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2 className="upload-title">Upload Song</h2>
        <form onSubmit={handleUpload} className="upload-form">
          <input
            type="text"
            placeholder="Song Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="upload-input"
          />

          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
            className="upload-input"
          />

          <select
            value={genre}
            required
            onChange={(e) => setGenre(e.target.value)}
            className="upload-input"
          >
            <option value="">Select Genre</option>
            <option value="pop">Pop</option>
            <option value="hip hop">Hip Hop</option>
            <option value="pop rock">Pop Rock</option>
            <option value="lofi">Lo-fi</option>
            <option value="EDM">EDM</option>
          </select>

          <input
            type="text"
            placeholder="Album"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="upload-input"
          />

          <label className="upload-label">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCover(e.target.files[0])}
            required
            className="upload-file"
          />

          <label className="upload-label">Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            required
            className="upload-file"
          />

          <button
            type="submit"
            className="upload-button"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;