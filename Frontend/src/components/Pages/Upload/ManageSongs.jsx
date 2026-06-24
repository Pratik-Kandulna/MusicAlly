import axios from "axios";

import "./ManageSongs.css";

function ManageSongs({ songs = [], filteredSongs, setSongs }) {
  const displaySongs = Array.isArray(filteredSongs)
    ? filteredSongs
    : Array.isArray(songs)
    ? songs
    : [];
  console.log("songs:", songs);
  console.log("filteredSongs:", filteredSongs);
  console.log("displaySongs:", displaySongs);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/songs/${id}`);
      if (setSongs) {
        setSongs((prev) => prev.filter((song) => song._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="manage-songs-page">
      <div className="manage-songs-header">
        <h1>Manage Songs</h1>
        <p>View and remove songs from your music library.</p>
      </div>

      <div className="manage-songs-grid">
        {!Array.isArray(displaySongs) || displaySongs.length === 0 ? (
          <div className="manage-empty">No songs available.</div>
        ) : (
          displaySongs.map((song) => (
            <div className="manage-song-card" key={song._id}>
              {console.log("ManageSongs item:", song)}
              <img
                className="manage-song-cover"
                src={(() => {
                  const raw =
                    song.imageUrl ||
                    song.coverUrl ||
                    song.cover ||
                    song.coverImage ||
                    song.image ||
                    "";

                  if (!raw) return "/placeholder.png";
                  return raw.startsWith("http")
                    ? raw
                    : `http://localhost:3000${raw.startsWith("/") ? "" : "/"}${raw}`;
                })()}
                alt={song.title}
              />

              <div className="manage-song-body">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <span>{song.genre}</span>
              </div>

              <div className="manage-song-actions">
                <button
                  className="manage-delete-btn"
                  onClick={() => handleDelete(song._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageSongs;