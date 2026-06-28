import "./Recommended.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Recommended() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!(user._id || user.id)) return;

    axios
      .get(`http://localhost:3000/api/playlists/${user._id || user.id}`)
      .then((res) => setPlaylists(Array.isArray(res.data) ? res.data : []))
      .catch(console.error);
  }, []);

  return (
    <div className="playlist-section">
      {/* HEADER */}
      <div className="playlist-header">
        <h2>Recommended Playlists</h2>
        <button className="create-btn">+ Create Playlist</button>
      </div>

      {/* GRID */}
      <div className="playlist-grid">
        {playlists.map((item) => (
          <div
            className="playlist-card"
            key={item._id}
            onClick={() => navigate(`/playlistDetails/${item._id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={
                item.coverImage
                  ? `http://localhost:3000/${item.coverImage}`
                  : item.songs?.[0]?.coverImage
                  ? `http://localhost:3000/${item.songs[0].coverImage}`
                  : "/images/default-playlist.jpg"
              }
              alt={item.name}
            />
            <div className="playlist-info">
              <h3>{item.name}</h3>
              <p>{(item.songs?.length || 0)} tracks</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommended;