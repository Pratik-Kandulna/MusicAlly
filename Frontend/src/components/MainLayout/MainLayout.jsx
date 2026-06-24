import { Outlet } from "react-router-dom";
import SNavbar from "../DashNavBar/sNavbar";
import { useState, useRef, useEffect } from "react";
import { FaArrowDown, FaBackward, FaForward, FaIcons, FaPause, FaPlay } from "react-icons/fa";
import axios from "axios";
import Footer from "../Dashboard/Footer/Footer";


function MainLayout({
  songs,
  setSongs,
  search,
  setSearch,
  setCurrentSong,
  currentSong,
  likedSongs,
  setLikedSongs,
}) {

  const safeSongs = songs || [];
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentQueue, setCurrentQueue] = useState([]);

  const playSong = async (song, queue = safeSongs) => {
  try {
    await axios.put(
      `http://localhost:3000/api/songs/play/${song._id}`
    );
  } catch (err) {
    console.log("Failed to update plays", err);
  }

  setCurrentQueue(queue);
  setCurrentSong(song);
  setIsPlaying(true);
};


  const togglePlay = () => {
    if (!audioRef.current) return;
  
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  
    setIsPlaying(prev => !prev);
  };

  const toggleLike = async (e, songId) => {
    if (e) e.stopPropagation();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const isLiked = (likedSongs || []).some(
      (id) => String(id) === String(songId)
    );

    try {
      if (isLiked) {
        await axios.post("http://localhost:3000/api/auth/unlike", {
          userId: user._id || user.id,
          songId,
        });

        setLikedSongs((prev = []) =>
          prev.filter((id) => String(id) !== String(songId))
        );
      } else {
        await axios.post("http://localhost:3000/api/auth/like", {
          userId: user._id || user.id,
          songId,
        });

        setLikedSongs((prev = []) => [...prev, songId]);
      }
    } catch (err) {
      console.error("Like toggle failed", err);
    }
  };

      {/***************-PLAY-NEXT-PREVIOUS-LOGIC*****************/}
  const playNext = () => {
  if (!currentSong || currentQueue.length === 0) return;

  const currentIndex = currentQueue.findIndex(
    (s) => s._id === currentSong._id
  );

  if (currentIndex === -1) return;

  const nextIndex = (currentIndex + 1) % currentQueue.length;

  setCurrentSong(currentQueue[nextIndex]);
  setIsPlaying(true);
};
  
  const playPrev = () => {
  if (!currentSong || currentQueue.length === 0) return;

  const currentIndex = currentQueue.findIndex(
    (s) => s._id === currentSong._id
  );

  if (currentIndex === -1) return;

  const prevIndex =
    (currentIndex - 1 + currentQueue.length) % currentQueue.length;

  setCurrentSong(currentQueue[prevIndex]);
  setIsPlaying(true);
};

  console.log( currentSong?.title);
  console.log(songs, search);

  const [progress, setProgress] = useState(0);

  const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

   


      {/***********-USE-EFFECTS************/}
      /******Play-when-song-changes********/
  useEffect(() => {
  if (audioRef.current && currentSong) {
    audioRef.current.load();
    audioRef.current.play();
    setIsPlaying(true);
  }
}, [currentSong]);

/*************-Track-progress-******************/  
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  const updateProgress = () => {
    setProgress(audio.currentTime);
  };

  audio.addEventListener("timeupdate", updateProgress);

  return () => {
    audio.removeEventListener("timeupdate", updateProgress);
  };
}, [currentSong]);

  return (
    <>
      <SNavbar 
        songs={songs}
        search={search}
        setSearch={setSearch}
        setCurrentSong={setCurrentSong}
      />

      <Outlet context={{ songs, safeSongs, setSongs, search, setSearch, setCurrentSong, currentSong, isPlaying, setIsPlaying, likedSongs, setLikedSongs, toggleLike, playSong, togglePlay }} />


      {currentSong && (
      <div className="Player" onClick={() => setIsExpanded(true)}>
      {/* ✅ PLAYER INSIDE SAME RETURN */}
      
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
    <button
      onClick={(e) => {
        e.stopPropagation();
        playPrev();
    }}>
      <FaBackward/>
    </button>

    <button 
    onClick={(e) => {e.stopPropagation();
        togglePlay();}}>
      {isPlaying ? <FaPause/> : <FaPlay/>}
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        playNext();
    }}>
        <FaForward/>
    </button>
  </div>

    <audio
      ref={audioRef}
      src={currentSong ? `http://localhost:3000/${currentSong.audioUrl}` : ""}
      autoPlay
      onEnded={playNext}
    />
    </div>
    )}

        {/*******-FULL-PLAYER-********/}
    {isExpanded && (
  <div className="FullPlayer">
    <button onClick={() => setIsExpanded(false)}><FaArrowDown/></button>

    <img src={`http://localhost:3000/${currentSong.coverImage}`} />

    <h2>{currentSong.title}</h2>
    <p>{currentSong.artist}</p>

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
    />

    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          playPrev();
      }}>
      <FaBackward/>
    </button>

      <button 
        onClick={(e) => {e.stopPropagation();
          togglePlay();}}>
        {isPlaying ? <FaPause/> : <FaPlay/>}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          playNext();
      }}>
        <FaForward/>
      </button>
    </div>
  </div>
)}
<Footer/>
    </>
  );
}

export default MainLayout;