import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./NewRelease.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";


function NewRelease() {

  const { songs, search, playSong, currentSong, isPlaying, togglePlay, likedSongs, setLikedSongs } = useOutletContext();

  const handleLike = async (songId) => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) return;

    const isLiked = (likedSongs || []).some(
      (id) => String(id) === String(songId)
    );

    try {
      if (isLiked) {
        await axios.post("http://localhost:3000/api/auth/unlike", {
          userId: loggedInUser._id || loggedInUser.id,
          songId,
        });

        setLikedSongs((prev) =>
          prev.filter((id) => String(id) !== String(songId))
        );
      } else {
        await axios.post("http://localhost:3000/api/auth/like", {
          userId: loggedInUser._id || loggedInUser.id,
          songId,
        });

        setLikedSongs((prev) => [...prev, songId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [playlists, setPlaylists] = useState([]);

const newReleases = [...(songs || [])]
  .filter((song) => {
    const q = (search || "").toLowerCase();
    return (
      song.title?.toLowerCase().includes(q) ||
      song.artist?.toLowerCase().includes(q)
    );
  })
  .sort(
    (a, b) =>
      new Date(b.releaseDate || b.createdAt) -
      new Date(a.releaseDate || a.createdAt)
  );

const getRelativeTime = (dateValue) => {
  if (!dateValue) {
    return "Recently added";
  }
  const date = new Date(dateValue);
  const now = new Date();
  const diffMs = now - date;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days < 7) {
    return `${Math.max(days, 0)} day${days === 1 ? "" : "s"} ago`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 5) {
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
};

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
    alert("Song added successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to add song.");
  }
};


  return (
    <>
      <div className="dashboard-container">
      

      <div className="newrelease-page">

        

        {/* HERO */}
        <div className="newrelease-hero">
          <h1>New Releases</h1>
          <p>Fresh drops and latest hits just for you</p>
        </div>

        {/* RELEASE GRID */}
        <div className="release-section">
          <h2>Latest Releases ({newReleases.length})</h2>

          <div className="release-grid">
            {newReleases.map((song, index) => (
              <div
                className={`release-card ${String(currentSong?._id) === String(song._id) ? "active-release-card" : ""}`}
                key={song._id || index}
                onClick={() => playSong(song, newReleases)}
              >
                <img src={`http://localhost:3000/${song.coverImage}`} alt={song.title} />

                <div className="release-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                  <span>{getRelativeTime(song.releaseDate || song.createdAt)}</span>
                </div>

                <div className="release-actions">
                  {String(currentSong?._id) === String(song._id || currentSong?._id) && (
                    <button
                      className="release-play-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                    >
                      {isPlaying ? "⏸" : "▶"}
                    </button>
                  )}
                  <div className="release-like-btn">
                    {(likedSongs || []).some(
                      (id) => String(id) === String(song._id)
                    ) ? (
                      <FaHeart
                        color="red"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(song._id);
                        }}
                      />
                    ) : (
                      <FaRegHeart
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(song._id);
                        }}
                      />
                    )}
                  </div>
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
      <Footer/>
      </div>
    </>
  );
}

export default NewRelease;