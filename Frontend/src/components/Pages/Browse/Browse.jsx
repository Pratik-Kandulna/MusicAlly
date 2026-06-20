import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./Browse.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { useOutletContext } from "react-router-dom";

const categories = [
  { name: "Pop", color: "#ff4d8d" },
  { name: "Rock", color: "#ff8a00" },
  { name: "Hip Hop", color: "#ff9900" },
  { name: "Electronic", color: "#ff4db8" },
  { name: "Jazz", color: "#00c6ff" },
  { name: "Classical", color: "#7f7fd5" },
  { name: "R&B", color: "#00b894" },
  { name: "Country", color: "#f39c12" },
  { name: "Latin", color: "#ff5733" },
  { name: "K-Pop", color: "#e84393" },
  { name: "Indie", color: "#0984e3" },
  { name: "Metal", color: "#636e72" }
];

const artists = [
  { name: "The Weeknd", 
    img: "/images/artist1.jpg" },
  { name: "Taylor Swift", 
    img: "/images/artist2.jpg" },
  { name: "Drake", 
    img: "/images/artist3.jpg" },
  { name: "Billie Eilish", 
    img: "/images/artist4.jpg" }
];

function Browse() {

const {songs, setSongs, search, setSearch, playSong,} = useOutletContext();  
const [playlists, setPlaylists] = useState([]);


useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  axios
    .get(`http://localhost:3000/api/playlists/${user._id || user.id}`)
    .then((res) => setPlaylists(res.data))
    .catch(console.error);
}, []);

const handleAddToPlaylist = async (songId) => {
  const playlistName = prompt(
    "Enter playlist name:\n\n" +
      playlists.map((p) => p.name).join("\n")
  );

  const playlist = playlists.find((p) => p.name === playlistName);

  if (!playlist) {
    alert("Playlist not found!");
    return;
  }

  try {
    await axios.post(
      `http://localhost:3000/api/playlists/${playlist._id}/add-song`,
      {
        songId,
      }
    );

    alert("✅ Song added to playlist!");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to add song.");
  }
};


  return (
    <>
    
    <div className="dashboard-container">

      

      <div className="browse-page">

        

        {/* HERO */}
        <div className="browse-hero">
          <h1>Browse</h1>
          <p>Discover music by mood, genre & artists</p>
        </div>

        {/* GENRES */}
        <div className="section">
          <h2>🎵 Browse Genres</h2>

          <div className="genre-grid">
            {categories.map((cat, i) => (
              <div
                className="genre-card"
                key={i}
                style={{ background: cat.color }}
              >
                <h3>{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* ARTISTS */}
        <div className="section">
          <h2>🔥 Popular Artists</h2>

          <div className="artist-row">
            {artists.map((artist, i) => (
              <div className="artist-card" key={i}>
                <img src={artist.img} alt="" />
                <p>{artist.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MOODS */}
        <div className="section">
          <h2>🎧 Mood Picks</h2>

          <div className="mood-grid">
            <div className="mood-card">Chill Vibes</div>
            <div className="mood-card">Workout</div>
            <div className="mood-card">Party</div>
            <div className="mood-card">Focus</div>
          </div>
        </div>

        <div className="section">
  <h2>🎵 Recommended Songs</h2>

  <div className="song-grid">
    {songs.map((song) => (
      <div key={song._id} className="song-card">
        
  <div className="song-cover">
    <img
      src={`http://localhost:3000/${song.coverImage}`}
      alt={song.title}
    />

    <button
      className="Bplay-btn"
      onClick={() => playSong(song, songs)}
    >
      ▶ Play
    </button>
  </div>

  <div className="song-info">
    <h3>{song.title}</h3>
    <p>{song.artist}</p>

    <div className="song-actions">
      <button
        className="playlist-btn"
        onClick={() => handleAddToPlaylist(song._id)}
      >
        ➕ Add
      </button>
    </div>
  </div>

      </div>
    ))}
  </div>
</div>

      </div>
      <Footer/>
    </div>
    </>
  );
}

export default Browse;