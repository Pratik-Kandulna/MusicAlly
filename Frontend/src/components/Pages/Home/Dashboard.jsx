import SNavbar from "../../DashNavBar/sNavbar";
import Welcome from "../../Welcome/Welcome";
import QuickCards from "../../QuickCards/QuickCards";
import RecentlyPlayed from "../../RecentlyPlayed/RecentlyPlayed";
import Playlists from "../../Dashboard/Playlists/Playlists";
import JumpBack from "../../Dashboard/JumpBack/JumpBack";
import Recommended from "../../Recommended/Recommended";
import Footer from "../../Dashboard/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./dashboard.css";

import { useRef, useState, useEffect } from "react";

function Dashboard({ songs, setSongs, search, setSearch  }) {

{/****************-UseNavigate-**************/}
  const navigate = useNavigate();

      {/***************-USE-LOCATION-*************/}
  const location = useLocation();


    {/***********-SONGS-FILTER-***********/}

    
  const filteredSongs = (songs || []).filter(song => {
  const title = song.title?.toLowerCase() || "";
  const artist = song.artist?.toLowerCase() || "";
  const query = search?.toLowerCase() || "";

  if (!query) return true;

  return title.includes(query) || artist.includes(query);
});
console.log("Search:", search);
console.log("Songs:", songs);
console.log("Filtered:", filteredSongs.length);


  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {

  if (!audioRef.current) return;
  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play();
  }
  setIsPlaying(prev => !prev);
};

const playNext = () => {
  const currentIndex = filteredSongs.findIndex(s => s._id === currentSong._id);
  const nextSong = filteredSongs[currentIndex + 1];
  if (nextSong) setCurrentSong(nextSong);
};

const playPrev = () => {
  const currentIndex = filteredSongs.findIndex(s => s._id === currentSong._id);
  const prevSong = filteredSongs[currentIndex - 1];
  if (prevSong) setCurrentSong(prevSong);
};
console.log(currentIndex, currentSong?.title);

const [progress, setProgress] = useState(0);

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

        {/**************-ROLE-DATA-****************/}
  const role = localStorage.getItem("role");


        {/******************-DELETE-FUNCTION-*********************/}
  const deleteSong = async (id) => {
  try {
    await fetch(`http://localhost:3000/api/songs/${id}`, {
      method: "DELETE",
    });

    // instead of reload
    const res = await fetch("http://localhost:3000/api/songs");
    const data = await res.json();
    setSongs(data);
    console.log("Deleted!");

  } catch (err) {
    console.log(err);
    console.log("Delete Failed!");
    
  }
};

            
  


useEffect(() => {
  if (audioRef.current && currentSong) {
    audioRef.current.play();
    setIsPlaying(true);
  }
}, [currentSong]);


useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const interval = setInterval(() => {
    setProgress(audio.currentTime);
  }, 300); // smoother

  return () => clearInterval(interval);
  
}, [currentSong]);


      {/***************-ROLE-CHECK-FUNCTION-*********************/}
useEffect(() => {
  const role = localStorage.getItem("role");

  if (!role) {
    navigate("/login");
  }
}, []);

  console.log("songs:", filteredSongs);


  useEffect(() => {
  fetch("http://localhost:3000/api/songs")
    .then(res => res.json())
    .then(data => setSongs(data));
}, []);


useEffect(() => {
  if (location.state?.refresh) {
    fetch("http://localhost:3000/api/songs")
      .then(res => res.json())
      .then(data => {
        setSongs(data);   // IMPORTANT
      });
  }
}, [location.state]);


useEffect(() => {
  if (audioRef.current && currentSong) {
    audioRef.current.load();   // reload new song
    audioRef.current.play();   // start playing
  }
}, [currentSong]);

console.log("Search:", search);
console.log("Songs:", songs.length);
console.log("Filtered:", filteredSongs.length);
  return (
  <>
    <div className="dashboard-container">

      <SNavbar search={search} setSearch={setSearch} />
      <Welcome />
      <QuickCards />
      <RecentlyPlayed 
        songs={songs} 
        filteredSongs={filteredSongs}
        setCurrentSong={setCurrentSong}
        setCurrentIndex={setCurrentIndex} 
        currentSong={currentSong}
      />
      <Playlists />
      <JumpBack />
      <Recommended />

        {/*******************-ADMIN-PANEL-*********************/}
      {role === "admin" && (
  <div style={{ padding: "20px", background: "#222", color: "#fff" }}>
    <h3>Admin Controls</h3>

    <button onClick={() => navigate("/Upload")}>
      Upload Song
    </button>

    <button style={{ marginLeft: "10px" }}>
      Manage Songs
    </button>
  </div>
)}

      <h2>All Songs</h2>

      <div className="AllSongs-Container">
        
        {filteredSongs?.map((song) => (
          <div className="AllSongs-Card"
            key={song._id}
            onClick={() => {
              setCurrentSong(song);
              setIsPlaying(true);
            }}
          >
            <img
              src={`http://localhost:3000/${song.coverImage}`}
              width="120"
            />
            <p>{song.title} - {song.artist}</p>
        {/*****************-DELETE-BUTTON-***********************/}
    {role === "admin" && (
      <button onClick={() => deleteSong(song._id)}>
        Delete
      </button>
    )}
  </div>
  ))}
</div>

      <Footer />
    </div>

    {/* ✅ PLAYER INSIDE SAME RETURN */}
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
        {/* LEFT */}

  <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "25%" }}>
    <img
      src={`http://localhost:3000/${currentSong.coverImage}`}
      width="50px"
      height="50px"
      style={{ borderRadius: "5px" }}
    />

    <div>
      <p>{currentSong.title}</p>
      <small>{currentSong.artist}</small>
    </div>
  </div>

  {/* CENTER */}

<div style={{ width: "40%", textAlign: "center" }}>
  <input
    type="range"
    min="0"
    max={audioRef.current?.duration || 0}
    value={progress}
    onChange={(e) => {
      const value = e.target.value;
      audioRef.current.currentTime = value;
      setProgress(value);
    }}
    style={{ width: "100%" }}
  />

  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
    <span>{formatTime(progress)}</span>
    <span>
  {formatTime(audioRef.current?.duration || currentSong?.duration || 0)}
</span>
  </div>
</div>

  {/* RIGHT */}

    <div style={{ width: "25%", display: "flex", justifyContent: "flex-end", gap: "10px",  }}>
    <button onClick={playPrev}>⏮</button>
    <button onClick={togglePlay}>
      {isPlaying ? "⏸" : "▶"}
    </button>
    <button onClick={playNext}>⏭</button>
  </div>

    <audio
      ref={audioRef}
      src={`http://localhost:3000/${currentSong?.audioUrl}`}
      autoPlay
      onEnded={playNext}
    />
      </div>
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


