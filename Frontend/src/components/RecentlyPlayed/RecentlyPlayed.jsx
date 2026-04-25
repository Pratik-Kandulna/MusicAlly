import "./RecentlyPlayed.css";
import { FaPlay, FaEllipsisH, FaCheckCircle } from "react-icons/fa";

const songs = [
  {
    id: 1,
    title: "Perfect",
    artist: "ED Sheeran",
    album: "Electric Nights",
    time: "3:45",
    img: "/images/Perfect.jpg",
    added: "2 hours ago",
    played: false,
  },
  {
    id: 2,
    title: "Baby",
    artist: "Justin Bieber",
    album: "Jazz Essentials",
    time: "4:12",
    img: "/images/Baby.jpg",
    added: "2 weeks ago",
    played: true,
  },
  {
    id: 3,
    title: "Faded",
    artist: "Alan Walker",
    album: "Beat Machine",
    time: "5:23",
    img: "/images/Faded.jpeg",
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