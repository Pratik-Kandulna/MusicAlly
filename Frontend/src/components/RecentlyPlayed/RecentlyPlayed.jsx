import "./RecentlyPlayed.css";
import { FaPlay, FaEllipsisH, FaCheckCircle } from "react-icons/fa";

const songs = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Rivers",
    album: "Electric Nights",
    time: "3:45",
    img: "/images/song1.jpg",
    added: "2 hours ago",
    played: false,
  },
  {
    id: 2,
    title: "Summer Breeze",
    artist: "The Saxman",
    album: "Jazz Essentials",
    time: "4:12",
    img: "/images/song2.jpg",
    added: "2 weeks ago",
    played: true,
  },
  {
    id: 3,
    title: "Electric Pulse",
    artist: "DJ Spectrum",
    album: "Beat Machine",
    time: "5:23",
    img: "/images/song3.jpg",
    added: "25 Feb 2026",
    played: false,
  },
];

function RecentlyPlayed() {
  return (
    <div className="recent-section">

      <div className="recent-header">
        <h2>Recently Played</h2>
        <span>View All</span>
      </div>

      <div className="recent-card">
        {songs.map((song, index) => (
          <div className="recent-row" key={song.id}>

            {/* INDEX / PLAY */}
            <div className="index-box">
              <span className="index">{index + 1}</span>
              <FaPlay className="play-icon" />
            </div>

            {/* SONG */}
            <div className="song-info">
              <img src={song.img} alt="" />
              <div>
                <h4>{song.title}</h4>
                <p>{song.artist}</p>
              </div>
            </div>

            {/* ALBUM */}
            <span className="album">{song.album}</span>

            {/* ADDED */}
            <span className="added">{song.added}</span>

            {/* RIGHT SIDE */}
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