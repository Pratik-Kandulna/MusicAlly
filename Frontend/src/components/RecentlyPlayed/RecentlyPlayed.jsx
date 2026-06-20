import "./RecentlyPlayed.css";
import { FaFileImport } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function RecentlyPlayed({ songs, setCurrentSong, setCurrentIndex, currentSong, currentUser, likedSongs=[], setLikedSongs, }) {
  console.log("currentUser in RecentlyPlayed:", currentUser);
  const {playSong,} = useOutletContext();

  
  const handleLike = async (songId) => {
  console.log("❤️ handleLike called:", songId);

  const loggedInUser =
    currentUser || JSON.parse(localStorage.getItem("user"));

  if (!loggedInUser) return;

  const isLiked = (likedSongs || []).some(
  id => String(id) === String(songId)
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

      setLikedSongs((prev) => {
  const next = [...prev, songId];
  console.log("NEW likedSongs:", next);
  return next;
});
    }
  } catch (err) {
    console.error(err);
  }
};

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
  

  

  return (
    <div className="recent-section">
      
      <div className="recent-header">
        <h2>Recently Played</h2>
      </div>

      <div className="recent-scroll">
        {songs.slice(0, 10).map((song, index) => (
          
          <div
            key={song._id}
            className={`song-card ${
              currentSong?._id === song._id ? "active" : ""}`}
              onClick={() => {
                playSong(song, songs);
              }}
          >

            <div className="img-wrapper">
              <img
                src={`http://localhost:3000/${song.coverImage}`}
                alt={song.title}
              />

              {/* PLAY BUTTON */}
              <div
                className="play-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  playSong(song, songs)
                }}
              >
                ▶
              </div>
            </div>
            

            <h4>
              
              <div className="like-button">
                {song.title}
                
              { (likedSongs || []).some((id) => String(id) === String(song._id)) ? (
                <FaHeart
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={(e) =>{ 
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
              
            </h4>
            <p>{song.artist}</p>
            

          </div>

        ))}
      </div>
    </div>
  );
}


export default RecentlyPlayed;
  
  
  
  
  
  
  
  
  
  
  
  
  
    {/*  <div className="recent-section">

      <div className="recent-header">
        <h2>Recently Played</h2>
        <span>View All</span>
      </div>

      <div className="recent-card">
        {songs.map((song, index) => (
          <div className="recent-row" key={song.id}>

            {/* INDEX / PLAY *
            <div className="index-box">
              <span className="index">{index + 1}</span>
              <FaPlay className="play-icon" />
            </div>

            {/* SONG *
            <div className="song-info">
              <img src={song.img} alt="" />
              <div>
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
              </div>
            </div>

            {/* ALBUM *
            <span className="album">{song.album}</span>

            {/* ADDED *
            <span className="added">{song.added}</span>

            {/* RIGHT SIDE *
            <div className="right-section">

              {song.played && (
                <FaCheckCircle className="played-icon" />
              )}

              <span className="time">{song.time}</span>

              <FaEllipsisH className="menu-icon" />

            </div>

          </div>
        ))}

        
      </div>
    </div>
  );
}

export default RecentlyPlayed;


{/*
{songs && songs.slice(0, 5).map((song) => (
      <div key={song._id}>
        
        <img
          src={`http://localhost:3000/${song.coverImage}`}
          alt={song.title}
          width="100"
        />

        <p>{song.title}</p>
        <p>{song.artist}</p>

      </div>
    ))}
    */}