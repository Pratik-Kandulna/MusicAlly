import { useParams, useOutletContext } from "react-router-dom";
import "./genreDetails.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

function GenreDetails() {
  const { genreName } = useParams();
  const {
    songs,
    playSong,
    currentSong,
    isPlaying,
    togglePlay,
    likedSongs,
    setLikedSongs,
    handleAddToPlaylist,
  } = useOutletContext();

  const genreSongs = (songs || []).filter(
    (song) =>
      (song.genre || "").toLowerCase() ===
      decodeURIComponent(genreName).toLowerCase()
  );

  const toggleLike = async (e, songId) => {
    e.stopPropagation();

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) return;

    const isLiked = (likedSongs || []).some(
      (id) => String(id) === String(songId)
    );

    try {
      if (isLiked) {
        await axios.post("http://localhost:3000/api/auth/unlike", {
          userId: loggedInUser._id || loggedInUser.id,
          songId,
        });

        setLikedSongs((prev = []) =>
          prev.filter((id) => String(id) !== String(songId))
        );
      } else {
        await axios.post("http://localhost:3000/api/auth/like", {
          userId: loggedInUser._id || loggedInUser.id,
          songId,
        });

        setLikedSongs((prev = []) => [...prev, songId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      
      <div className="dashboard-container">
        <div className="genre-details-page">
          <h1>{decodeURIComponent(genreName)}</h1>
          <p>{genreSongs.length} songs</p>

          <div className="genre-song-list">
            {genreSongs.map((song) => (
              <div
                className={`genre-song-card ${String(currentSong?._id) === String(song._id) ? "active-genre-card" : ""}`}
                key={song._id}
                onClick={() => playSong(song, genreSongs)}
              >
                <img
                  className="genre-song-cover"
                  src={`http://localhost:3000/${song.coverImage}`}
                  alt={song.title}
                />
                <div className="genre-song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
                <div className="genre-card-actions">
                  <div className="genre-like-btn">
                    {(likedSongs || []).some((id) => String(id) === String(song._id)) ? (
                      <FaHeart
                        color="red"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => toggleLike(e, song._id)}
                      />
                    ) : (
                      <FaRegHeart
                        style={{ cursor: "pointer" }}
                        onClick={(e) => toggleLike(e, song._id)}
                      />
                    )}
                  </div>

                  <button
                    className="genre-add-btn"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (!handleAddToPlaylist) return;
                      await handleAddToPlaylist(song);
                    }}
                  >
                    + Add
                  </button>
                </div>
                {String(currentSong?._id) === String(song._id) && (
                  <button
                    className="genre-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
}

export default GenreDetails;