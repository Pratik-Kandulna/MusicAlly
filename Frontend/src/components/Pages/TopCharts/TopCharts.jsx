import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./TopCharts.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const charts = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    img: "/images/song1.jpg",
    plays: "9.8M",
    duration: "3:20"
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    img: "/images/song2.jpg",
    plays: "8.5M",
    duration: "3:23"
  },
  {
    title: "Peaches",
    artist: "Justin Bieber",
    img: "/images/song3.jpg",
    plays: "7.9M",
    duration: "3:18"
  },
  {
    title: "Stay",
    artist: "The Kid LAROI",
    img: "/images/song4.jpg",
    plays: "7.5M",
    duration: "2:45"
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    img: "/images/song5.jpg",
    plays: "7.1M",
    duration: "4:10"
  }
];

function TopCharts() {

const { songs, setSongs, search, setSearch } = useOutletContext();

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
    <>
      
      <div className="dashboard-container">

      <div className="topcharts-page">

        

        {/* HERO */}
        <div className="topcharts-hero">
          <h1>Top Charts</h1>
          <p>Most streamed tracks right now</p>
        </div>

        {/* LIST */}
        <div className="charts-section">
          <h2>🔥 Trending Tracks</h2>

          <div className="charts-list">
            {charts.map((song, index) => (
              <div className="chart-row" key={index}>

                <span className="rank">{index + 1}</span>

                <img src={song.img} alt="" />

                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>

                <span className="plays">{song.plays}</span>

                <span className="duration">{song.duration}</span>

                <button className="play-btn">▶</button>

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

export default TopCharts;