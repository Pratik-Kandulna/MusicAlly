import { Outlet } from "react-router-dom";
import SNavbar from "../DashNavBar/sNavbar";
import { useState, useRef, useEffect } from "react";
import { FaArrowDown, FaBackward, FaForward, FaIcons, FaPause, FaPlay } from "react-icons/fa";


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


  const togglePlay = () => {
    if (!audioRef.current) return;
  
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  
    setIsPlaying(prev => !prev);
  };

      {/***************-PLAY-NEXT-PREVIOUS-LOGIC*****************/}
  const playNext = () => {
    if (!currentSong) return;
      const currentIndex = safeSongs.findIndex(s => s._id === currentSong._id);
      const nextSong = safeSongs[currentIndex + 1];
    if (nextSong) setCurrentSong(nextSong);
  };
  
  const playPrev = () => {
    if (!currentSong) return;
        const currentIndex = safeSongs.findIndex(s => s._id === currentSong._id);
  
    if (currentIndex > 0) {
        const prevSong = safeSongs[currentIndex - 1];
      setCurrentSong(prevSong);
    }
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

      <Outlet context={{ songs, safeSongs, setSongs, search, setSearch, setCurrentSong, currentSong, setIsPlaying, likedSongs, setLikedSongs }} />


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
        playPrev();
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
          playPrev();
      }}>
        <FaForward/>
      </button>
    </div>
  </div>
)}
    </>
  );
}

export default MainLayout;