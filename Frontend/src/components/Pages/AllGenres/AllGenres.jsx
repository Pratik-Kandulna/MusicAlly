import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./AllGenres.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";



const genres = [
  { name: "Pop", tracks: "18.2K", color: "#ff4d8d" },
  { name: "Pop-Rock", tracks: "12.4K", color: "#ff6a00" },
  { name: "Hip Hop", tracks: "10.8K", color: "#ff9900" },
  { name: "Electronic", tracks: "15.3K", color: "#ff4db8" },
  { name: "Jazz", tracks: "8.6K", color: "#00c6ff" },
  { name: "Classical", tracks: "6.4K", color: "#7f7fd5" },
  { name: "R&B", tracks: "9.2K", color: "#00b894" },
  { name: "Country", tracks: "7.5K", color: "#f39c12" },
  { name: "Latin", tracks: "11.1K", color: "#ff5733" },
  { name: "K-Pop", tracks: "13.7K", color: "#e84393" },
  { name: "Indie", tracks: "8.9K", color: "#0984e3" },
  { name: "Metal", tracks: "5.8K", color: "#636e72" }
];

function AllGenres() {

const { songs, setSongs, search, setSearch } = useOutletContext();
const navigate = useNavigate();

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
    "Enter playlist name:\n" +
    playlists.map((p) => p.name).join("\n")
  );

  const playlist = playlists.find((p) => p.name === playlistName);

  if (!playlist) {
    alert("Playlist not found");
    return;
  }

  // Call your backend API here
};

const normalizeGenre = (value) =>
  (value || "")
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getGenreTrackCount = (genreName) => {
  return (songs || []).filter(
    (song) => normalizeGenre(song.genre) === normalizeGenre(genreName)
  ).length;
};

const getGenreSongs = (genreName) => {
  return (songs || []).filter(
    (song) => normalizeGenre(song.genre) === normalizeGenre(genreName)
  );
};

  return (
    <>
     <div className="dashboard-container">
     
             

      <div className="genres-page">
        

        {/* HERO */}
        <div className="genres-hero">
          <h1>Browse Genres</h1>
          <p>Explore music across all your favorite genres</p>
        </div>

        {/* Clicking a genre card navigates to its dedicated genre page */}
        {/* GRID */}
        <div className="genres-container all-genres-grid">
          {genres.map((g, index) => (
            <div
              className="genre-card"
              style={{
                background: `linear-gradient(135deg, ${g.color}, #7aa7ff)`,
                cursor: "pointer",
              }}
              key={index}
              onClick={() =>
                navigate(`/genres/${encodeURIComponent(g.name.toLowerCase())}`)
              }
            >
              <h2>{g.name}</h2>
              <p>{getGenreTrackCount(g.name)} tracks</p>

              <div className="music-icon">♪</div>
            </div>
          ))}
        </div>

      </div>
      
      </div>
    </>
  );
}

export default AllGenres;