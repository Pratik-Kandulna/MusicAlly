import "./DPlaylists.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const playlists = [
  {
    title: "Workout Mix",
    tracks: "45 tracks • 3h 12m",
    img: "/images/Workout Mix.jpeg",
  },
  {
    title: "Chill Vibes",
    tracks: "32 tracks • 2h 24m",
    img: "/images/Chill  Vibes.jpeg",
  },
  {
    title: "Study Focus",
    tracks: "28 tracks • 2h 45m",
    img: "/images/Study Focus.jpeg",
  },
  {
    title: "Party Hits",
    tracks: "52 tracks • 3h 48m",
    img: "/images/Party Hits.jpeg",
  },
];

function DPlaylists() {

const navigate = useNavigate();
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

const handleDelete = async (id) => {
  await axios.delete(`http://localhost:3000/api/playlists/${id}`);

  setPlaylists((prev) => prev.filter((p) => p._id !== id));
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
      

      <div className="playlist-page">

        {/* SECTION */}
        <div className="playlist-section">
          <div className="playlist-header">
            <h2>Your Playlists🎧</h2>
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
              <div
                className="playlist-card"
                key={item._id}
                onClick={() => navigate(`/playlist/${item._id}`)}
              >
                <img src={item.img} alt="" />
                <h3>{item.name}</h3>
                <p>{item.songs.length} songs</p>

                <button
                  onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
      
    </>
  );
}
export default DPlaylists;