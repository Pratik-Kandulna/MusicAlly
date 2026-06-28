import { useState } from "react";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./SavedAlbums.css";
import { FaTrash } from "react-icons/fa";

// Future: consume shared data from outlet context when saved albums are backed by the API.

function SavedAlbums() {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userKey = currentUser.email || currentUser._id || currentUser.id || "guest";
  const [albumData, setAlbumData] = useState(
    JSON.parse(
      localStorage.getItem(`savedAlbums_${userKey}`) ||
        localStorage.getItem("savedAlbums") ||
        "[]"
    )
  );

  const handleDeleteAlbum = (albumTitle) => {
    const updated = albumData.filter((a) => a.title !== albumTitle);
    setAlbumData(updated);
    localStorage.setItem(`savedAlbums_${userKey}`, JSON.stringify(updated));
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="albums-page">
          {/* HERO */}
          <div className="albums-hero">
            <h1>Saved Albums</h1>
            <p>Albums you have personally saved.</p>
          </div>

          {/* SECTION */}
          <div className="albums-section">
            <h2>💿 Your Albums</h2>

            {albumData.length === 0 ? (
              <p className="empty-state">
                No saved albums yet. Start adding songs to build your collection.
              </p>
            ) : (
              <div className="albums-grid">
                {albumData.map((album, i) => (
                  <div className="album-card" key={i}>
                    <img src={album.img} alt={album.title} />

                    <div className="album-info">
                      <h3>{album.title}</h3>
                      <p>{album.artist}</p>
                      <span>
                        {album.year} • {album.count} song
                        {album.count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <button
                      className="delete-album-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAlbum(album.title);
                      }}
                    >
                      <FaTrash/>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
}

export default SavedAlbums;