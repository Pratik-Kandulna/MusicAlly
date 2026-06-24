import SNavbar from "../../DashNavBar/sNavbar";
import Welcome from "../../Welcome/Welcome";
import QuickCards from "../../QuickCards/QuickCards";
import RecentlyPlayed from "../../RecentlyPlayed/RecentlyPlayed";
import DPlaylists from "../../Dashboard/Playlists/DPlaylists";
import JumpBack from "../../Dashboard/JumpBack/JumpBack";
import Recommended from "../../Recommended/Recommended";
import Footer from "../../Dashboard/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";

import { useRef, useState, useEffect } from "react";


function Dashboard({ setCurrentIndex, currentUser }) {
console.log("Dashboard currentUser:", currentUser);
const { songs, setSongs, search, setSearch, currentSong, setCurrentSong, setIsPlaying, likedSongs, setLikedSongs} = useOutletContext();
const [deletingId, setDeletingId] = useState(null);


{/****************-UseNavigate-**************/}
  const navigate = useNavigate();

      {/***************-USE-LOCATION-*************/}
  const location = useLocation();


    {/***********-SONGS-FILTER-***********/}
  const [recentSongs, setRecentSongs] = useState([]);
  const safeSongs = songs || [];
console.log("Clicked song:", currentSong);


        {/**************-ROLE-DATA-****************/}
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("user"));


        {/******************-DELETE-FUNCTION-*********************/}
  const deleteSong = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this song?");
  if (!confirmDelete) return;

  try {
    setDeletingId(id); // 🔥 lock this button

    const res = await fetch(`http://localhost:3000/api/songs/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Delete failed");

    // update UI instantly
    setSongs((prev) => prev.filter((song) => song._id !== id));

    // if deleted song is currently playing
    if (currentSong?._id === id) {
      setCurrentSong(null);
      setIsPlaying(false);
    }

  } catch (err) {
    console.error(err);
    alert("Delete failed!");
  } finally {
    setDeletingId(null); // 🔓 unlock
  }
};

            
  





      {/***************-ROLE-CHECK-FUNCTION-*********************/}
useEffect(() => {
  const role = localStorage.getItem("role");

  if (!role) {
    navigate("/login");
  }
}, []);

  console.log("songs:", songs);





useEffect(() => {
  if (!currentSong) return;

  setRecentSongs((prev) => {
    const filtered = prev.filter(
      (song) => song._id !== currentSong._id
    );

    return [currentSong, ...filtered].slice(0, 10);
  });
}, [currentSong]);




// LOAD once
useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("recentSongs"));
  if (stored) setRecentSongs(stored);
}, []);

// SAVE when updated
useEffect(() => {
  localStorage.setItem(
    "recentSongs",
    JSON.stringify(recentSongs)
  );
}, [recentSongs]);

console.log("Search:", search);
console.log("Songs:", songs.length);
console.log("Filtered:", songs.length);


  return (
  <>
      <Welcome />
      <QuickCards />
      <RecentlyPlayed 
        songs={recentSongs} 
        filteredSongssongs={songs}
        setCurrentSong={setCurrentSong}
        currentUser={currentUser}
        likedSongs={likedSongs}
        setLikedSongs={setLikedSongs}
        setCurrentIndex={setCurrentIndex} 
        currentSong={currentSong}
      />
      <DPlaylists />
      <JumpBack />
      <Recommended />

        {/*******************-ADMIN-PANEL-*********************/}
      {user?.role === "admin" && (
  <div style={{ padding: "20px", background: "#222", color: "#fff" }}>
    <h3>Admin Controls</h3>

    <button onClick={() => navigate("/Upload")}>
      Upload Song
    </button>

    <button onClick={() => navigate("/ManageSongs")}>
      Manage Songs
    </button>
  </div>
)}

    {user?.role === "admin" && (
      <>
      <h2>All Songs</h2>
      
      <div className="AllSongs-Container">
        
    {songs?.map((song) => (
      <div className="AllSongs-Card"
        key={song._id}
        onClick={() => {
          console.log("CLICKED:", song);
          setCurrentSong(song);
          setIsPlaying(true);
        }}
      > 
        <img
          src={`http://localhost:3000/${song.coverImage}`}
          width="120"
        />
        <p>{song.title} - {song.artist}</p> 

        {/******** DELETE-BUTTON ************/}
        <button
          onClick={() => deleteSong(song._id)}
          disabled={deletingId === song._id}
          style={{
          opacity: deletingId === song._id ? 0.5 : 1,
          cursor: deletingId === song._id ? "not-allowed" : "pointer"
  }}
>
  {deletingId === song._id ? "Deleting..." : "Delete"}
</button>

      </div>
    ))}
  </div>
  </>
)}

      
    

    
    
  </>
);
}
export default Dashboard;
  



{/*
    
      {currentSong && (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      marginLeft:"5px",
      marginBottom:"2px",
      width: "96.5%",
      borderRadius: "10px",
      color: "black",
      padding: "10px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(97, 66, 160, 0.5)",
      backdropFilter: "blur(50px)",
      WebkitBackdropFilter: "blur(50px)", 
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
      zIndex: 9999
      }}>
      */}
{/*}
      <audio ref={audioRef} controls autoPlay>
      <source
        src={`http://localhost:3000/${currentSong.audioUrl}`}
        type="audio/mpeg"
      />
      </audio>

      */}
    
    {/* LEFT: COVER */}
{/*}
  <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "25%" }}>
    <img
      src={`http://localhost:3000/${currentSong.coverImage}`}
      width="50"
      height="50"
      style={{ borderRadius: "5px" }}
    />

    <div>
      <p>{currentSong.title}</p>
      <small>{currentSong.artist}</small>
    </div>
  </div>
  */}

    {/* CENTER: PROGRESS BAR */}
    {/*

  <div style={{ width: "50%", textAlign: "center" }}>
    <input
      type="range"
      min="0"
      max={audioRef.current?.duration || 0}
      value={progress}
      onChange={(e) => {
        audioRef.current.currentTime = e.target.value;
        setProgress(e.target.value);
      }}
      style={{ width: "100%" }}
    />
    <div style={{ fontSize: "12px" }}>
      {Math.floor(progress || 0)}s / {Math.floor(audioRef.current?.duration || 0)}s
    </div>
  </div>
  */}

  {/* RIGHT: CONTROLS */}
  {/*

  <div style={{ width: "25%", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
    <button onClick={playPrev}>⏮</button>
    <button onClick={togglePlay}>
      {isPlaying ? "⏸" : "▶"}
    </button>
    <button onClick={playNext}>⏭</button>
  </div>
</div>

  );
  }
}
  */}


