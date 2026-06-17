import "./MyPlaylists.css";
import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Home/dashboard.css";

function Playlists() {

const [playlists, setPlaylists] = useState([]);

const createPlaylist = async (name) => {
  if (!name.trim()) return;

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    
    // 🔍 Debug logs

    console.log("Playlist name:", name);
    console.log("User object:", user);
    console.log("User ID:", user?._id || user?.id);
    const res = await axios.post(
      "http://localhost:3000/api/playlists/create",
      {
        name: name,
        userId: user._id || user.id,
      }
    );

    setPlaylists((prev) => [...prev, res.data]);
  } catch (err) {
    console.log("Status:", err.response?.status);
    console.log("Server response:", err.response?.data);
    console.error(err);
  }
};

useEffect(() => {
  const fetchPlaylists = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      console.log("User from localStorage:", user);
      console.log("user._id:", user?._id || user?.id);
      console.log("user.id:", user?._id || user?.id);
      const res = await axios.get(
        `http://localhost:3000/api/playlists/${user._id || user.id}`
      );

      setPlaylists(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchPlaylists();
}, []);
  return (
    <>
      <div className="dashboard-container">

      <div className="playlist-page">

        {/* HERO */}
        <div className="playlist-hero">
          <h1>My Playlists</h1>
          <p>Organize and enjoy your music collections</p>
        </div>

        {/* SECTION */}
        <div className="playlist-section">
          <div className="playlist-header">
            <h2>🎧 Your Collections</h2>
            <button
              className="create-btn"
              onClick={() => {
                const name = prompt("Enter playlist name");
                if (name) {
                  createPlaylist(name);
                }
              }}
            >
              + Create Playlist
            </button>
          </div>

          {/* GRID */}
          <div className="playlist-grid">
            {playlists.map((item, i) => (
              <div className="playlist-card" key={i}>
                <img src={item.img} alt="" />

                <div className="playlist-info">
                  <h3>{item.name}</h3>
                  <p>{item.songs.length} songs</p>
                </div>
              </div>
            ))}
          </div>

        </div>
            <Footer/>
      </div>
      </div>
    </>
  );
}

export default Playlists;