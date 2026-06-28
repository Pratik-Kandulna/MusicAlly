import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./TopCharts.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function TopCharts() {

const { songs, setSongs, search, setSearch, playSong, currentSong, isPlaying, togglePlay, likedSongs, toggleLike } = useOutletContext();
console.log('TopCharts toggleLike:', toggleLike, 'likedSongs:', likedSongs);

const topSongs = [...(songs || [])].sort((a, b) => (b.plays || 0) - (a.plays || 0));

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

  try {
    await axios.post(
      `http://localhost:3000/api/playlists/${playlist._id}/add-song`,
      { songId }
    );

    alert("Song added to playlist successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to add song to playlist.");
  }
};


  return (
    <>
      
      <div className="dashboard-container">

      <div className="topcharts-page">

        

        {/* HERO */}
        <div className="topcharts-hero">
          <h1>Top Charts</h1>
          <p>Most streamed tracks right now</p>
        </div>

        {/* LIST */}
        <div className="charts-section">
          <h2>🔥 Trending Tracks</h2>

          <div className="topcharts-grid">
            {topSongs.map((song, index) => (
              <div
                className={`chart-row ${String(currentSong?._id) === String(song._id) ? "active-chart-row" : ""}`}
                key={index}
                onClick={() => playSong(song, topSongs)}
                style={{ cursor: "pointer" }}
              >
                <div className="chart-left">
                  <span className="rank">#{index + 1}</span>

                  <div className="chart-image-wrapper">
                    <img
                      src={`http://localhost:3000/${song.coverImage}`}
                      alt={song.title}
                    />

                    {String(currentSong?._id) === String(song._id) && (
                      <button
                        className="Tplay-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                      >
                        {isPlaying ? "⏸" : "▶"}
                      </button>
                    )}
                  </div>

                  <div className="song-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                    <small>
                      {song.genre} • {song.plays || 0} plays
                    </small>
                  </div>
                </div>

                <div className="chart-actions">

                  <button
                    type="button"
                    className="genre-like-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (typeof toggleLike === 'function') {
                        toggleLike(e, song._id);
                      } else {
                        console.error('toggleLike is not available from useOutletContext');
                      }
                    }}
                  >
                    {(likedSongs || []).some((id) => String(id) === String(song._id)) ? (
                      <FaHeart
                        color="red"
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <FaRegHeart
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </button>

                  <button
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToPlaylist(song._id);
                    }}
                  >
                    ➕ Add
                  </button>
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

export default TopCharts;