import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./Browse.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { FaBookmark, FaSave } from "react-icons/fa";

const categories = [
  { name: "Pop", color: "#ff4d8d" },
  { name: "pop-rock", color: "#ff8a00" },
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

const normalizeGenreName = (value) =>
  (value || "")
    .trim()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

function Browse() {

const { songs, playSong } = useOutletContext();  
const navigate = useNavigate();
const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
const userKey = currentUser.email || currentUser._id || currentUser.id || "guest";
const [savedAlbums, setSavedAlbums] = useState(() =>
  JSON.parse(
    localStorage.getItem(`savedAlbums_${userKey}`) ||
      localStorage.getItem("savedAlbums") ||
      "[]"
  )
);
const [playlists, setPlaylists] = useState([]);

const artists = Object.values(
  songs.reduce((acc, song) => {
    const name = (song.artist || "").trim();
    if (!name) return acc;

    if (!acc[name]) {
      acc[name] = {
        name,
        img: `http://localhost:3000/${song.coverImage}`,
        songCount: 0,
        albums: new Set(),
      };
    }

    acc[name].songCount += 1;
    if (song.album && song.album.trim() !== "" && song.album.trim().toLowerCase() !== "null") {
      acc[name].albums.add(song.album.trim());
    }

    return acc;
  }, {})
).map((artist) => ({
  ...artist,
  albumCount: artist.albums.size,
}));

const dynamicCategories = Array.from(
  new Set(
    songs
      .map((song) => normalizeGenreName(song.genre))
      .filter(Boolean)
  )
).map((name, index) => ({
  name,
  color: categories[index % categories.length].color,
}));

const mergedCategories = [
  ...dynamicCategories,
  ...categories.filter(
    (cat) =>
      !dynamicCategories.some(
        (dyn) =>
          normalizeGenreName(dyn.name).toLowerCase() ===
          normalizeGenreName(cat.name).toLowerCase()
      )
  ),
];

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  axios
    .get(`http://localhost:3000/api/playlists/${user._id || user.id}`)
    .then((res) => setPlaylists(res.data))
    .catch(console.error);
}, []);

const handleSaveAlbum = (song) => {
  const albumName = song.album || song.title;
  const alreadySaved = savedAlbums.some(album => album.title === albumName);
  if (alreadySaved) {
    alert("Album already saved!");
    return;
  }
  const newAlbum = {
    title: albumName,
    artist: song.artist,
    img: `http://localhost:3000/${song.coverImage}`,
    year: song.year || new Date().getFullYear(),
    count: 1
  };
  const updatedAlbums = [...savedAlbums, newAlbum];
  setSavedAlbums(updatedAlbums);
  localStorage.setItem(`savedAlbums_${userKey}`, JSON.stringify(updatedAlbums));
  localStorage.setItem("savedAlbums", JSON.stringify(updatedAlbums));
  alert("✅ Album saved!");
};

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
            {mergedCategories.map((cat, i) => (
              <div
                className="genre-card"
                key={i}
                style={{ background: cat.color, cursor: "pointer" }}
                onClick={() =>
                  navigate(`/genres/${encodeURIComponent(cat.name.toLowerCase())}`)
                }
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
                <small>{artist.songCount} song{artist.songCount !== 1 ? "s" : ""} • {artist.albumCount} album{artist.albumCount !== 1 ? "s" : ""}</small>
              </div>
            ))}
          </div>
        </div>

        {/* ALBUMS */}
        <div className="section">
          <h2>💿 Featured Albums</h2>
          <div className="song-grid">
            {Array.from(new Map(songs.filter(song => {
              const album = song.album;
              return (
                typeof album === "string" &&
                album.trim() !== "" &&
                album.trim().toLowerCase() !== "null"
              );
            }).map(song => [song.album, song])).values()).map((song) => (
              <div key={song.album || song._id} className="song-card" onClick={() => navigate(`/AlbumDetails`, {
                state: { albumName: song.album }
              })} style={{ cursor: 'pointer' }}>
                <div className="song-cover">
                  <img src={`http://localhost:3000/${song.coverImage}`} alt={song.album || song.title} />
                </div>
                <div className="song-info">
                  <h3>{song.album || song.title}</h3>
                  <p>{song.artist}</p>
                  <div className="song-actions">
                    <button className="playlist-btn" onClick={(e) => {
                      e.stopPropagation();
                      handleSaveAlbum(song);
                    }}>
                      <FaBookmark/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
    
    </div>
    </>
  );
}

export default Browse;