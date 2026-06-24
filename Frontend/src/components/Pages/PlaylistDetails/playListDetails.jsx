import { useEffect, useState } from "react";
import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "./playListDetails.css";
import "../Home/dashboard.css";
import { useParams } from "react-router-dom";

import { useOutletContext } from "react-router-dom";
import axios from "axios";

function PlaylistDetails() {

  const {playSong, currentSong, setCurrentSong,} = useOutletContext();
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  


  const handleRemoveSong = async (songId) => {
  try {
    await axios.delete(
      `http://localhost:3000/api/playlists/${playlistId}/remove-song/${songId}`
    );

    setPlaylist((prev) => ({
      ...prev,
      songs: prev.songs.filter((song) => song._id !== songId),
    }));

    alert("✅ Song removed!");
  } catch (err) {
    console.error(err);
    alert("❌ Failed to remove song");
  }
};

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/playlists/details/${playlistId}`
        );
        setPlaylist(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  if (!playlist) return <h2>Loading...</h2>;

  return (
    <>
      
       <div className="dashboard-container">
       <div className="playlist-details">
      <h1>{playlist.name}</h1>
      <p>Total Songs: {playlist.songs.length}</p>
      <button
        className="play-all-btn"
        onClick={() => {
          if (playlist.songs.length > 0) {
            playSong(playlist.songs[0], playlist.songs);
          }
        }}
      >
        ▶ Play Playlist
      </button>

      {playlist.songs.length === 0 ? (
        <h3>No songs in this playlist yet 🎵</h3>
      ) : (
        <div className="playlist-song-grid">
  {playlist.songs.map((song) => (
    <div key={song._id} className="playlist-song-card">

      <img
        className="playlist-cover"
        src={`http://localhost:3000/${song.coverImage}`}
        alt={song.title}
      />

      <div className="playlist-song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>

        <div className="playlist-actions">
          <button
            className="playlist-play-btn"
            onClick={() => playSong(song, playlist.songs)} 
          >
            ▶ Play
          </button>

          <button
            className="remove-btn"
            onClick={() => handleRemoveSong(song._id)}
          >
            🗑 Remove
          </button>
        </div>
      </div>

    </div>
  ))}
</div>
      )}
    </div>
    
    
    </div>
    </>
  );
}

export default PlaylistDetails;