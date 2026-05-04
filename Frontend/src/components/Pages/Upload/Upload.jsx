import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: "40px" }}>
      <h2>Upload Song</h2>

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <br /><br />

        <select value={genre} required onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select Genre</option>
          <option value="pop">Pop</option>
          <option value="hip hop">Hip Hop</option>
          <option value="pop rock">Pop Rock</option>
          <option value="lofi">Lo-fi</option>
        </select>

        <br /><br />  

        <input
          type="text"
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          
        />

        <br /><br />

        <span>Cover: </span>
        <input
          type="file"
          placeholder="Cover"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
          required
        />
        <br /><br />

        <span>Song: </span>
        <input
          type="file"
          
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
          required
        />
        <br /><br />

        

        <button  type="submit">Upload</button>
       
      </form>
    </div>
  );
}

export default Upload;