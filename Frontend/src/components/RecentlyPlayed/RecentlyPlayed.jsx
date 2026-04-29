import "./RecentlyPlayed.css";

function RecentlyPlayed({ songs, setCurrentSong, setCurrentIndex, currentSong }) {
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
              setCurrentSong(song);
              setCurrentIndex(index);
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
                  setCurrentSong(song);
                }}
              >
                ▶
              </div>
            </div>

            <h4>{song.title}</h4>
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