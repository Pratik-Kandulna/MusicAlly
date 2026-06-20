import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./Trending.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function Trending() {

const {songs, setSongs, playSong, setCurrentSong,} = useOutletContext();const safeSongs = songs || [];

const trendingSongs = [...safeSongs]
  .sort((a, b) => (b.plays || 0) - (a.plays || 0))
  .slice(0, 6);

{/**********-BREAKOUT-ARTISTS-*********** */}
const breakoutArtists = Object.values(
  safeSongs.reduce((acc, song) => {
    if (!acc[song.artist]) {
      acc[song.artist] = {
        name: song.artist,
        count: 0,
        cover: song.coverImage,
      };
    }
    acc[song.artist].count += 1;
    return acc;
  }, {})
)
  .sort((a, b) => b.count - a.count)
  .slice(0, 6);

  const handleArtistClick = (artistName) => {
  const artistSongs = safeSongs.filter(
    (song) => song.artist === artistName
  );

  if (artistSongs.length > 0) {
    setSongs(artistSongs);          // update queue
    setCurrentSong(artistSongs[0]); // play first song
  }
};

{/**********-TRENDING-GENRES-*********** */}
  const trendingGenres = Object.values(
  safeSongs.reduce((acc, song) => {
    const genre = song.genre || "Other";

    if (!acc[genre]) {
      acc[genre] = {
        name: genre,
        count: 0,
      };
    }

    acc[genre].count += 1;
    return acc;
  }, {})
)
  .sort((a, b) => b.count - a.count)
  .slice(0, 6);

  const handleGenreClick = (genreName) => {
  const filtered = songs.filter(
    (song) =>
      song.genre?.toLowerCase() === genreName.toLowerCase()
  );

  if (filtered.length > 0) {
    setSongs(filtered);
    setCurrentSong(filtered[0]);
  }
};

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
    
    
    <div className="trending-page">
     

      {/* HERO */}
      <div className="trending-hero">
        <span className="badge">🔥 Updated in Real-Time</span>

        <h1>Trending</h1>
        <p>Discover what's hot right now across all platforms and genres</p>

        <div className="update-box">
          <span>⏱ Last updated</span>
          <strong>5 minutes ago</strong>
        </div>
      </div>

      {/* TRENDING NOW */}
      <section className="section">
  <div className="section-header">
    <h2>🔥 Trending Now</h2>
  </div>

  <div className="trending-grid">
  {trendingSongs.map((song) => (
    <div className="trend-card" key={song._id}>
      {/* Cover Image */}
      <div className="image-wrapper">
        <img
          src={`http://localhost:3000/${song.coverImage}`}
          alt={song.title}
        />

        {/* Hover Overlay */}
        <div className="overlay">
          <button
            className="overlay-play-btn"
            onClick={() => playSong(song, trendingSongs)}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <span>{song.genre}</span>

        <h3>{song.title}</h3>

        <p>{song.artist}</p>

        <small>{song.plays || 0} plays</small>

        {/* Bottom Buttons */}
        <div className="card-actions">
          <button
            className="Tplay-btn"
            onClick={() => playSong(song, trendingSongs)}
          >
            ▶ Play
          </button>

          <button
            className="add-btn"
            onClick={() => handleAddToPlaylist(song._id)}
          >
            ➕ Add
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
</section>

      {/* BREAKOUT ARTISTS */}
      
      <section className="section">
  <div className="section-header">
    <h2>Breakout Artists</h2>
  </div>

  <div className="artist-grid">
    {breakoutArtists.map((artist) => (
        <div className="artist-card" key={artist.name}>
        <img src={artist.cover} alt={artist.name} />

        <h3>{artist.name}</h3>

        <p>{artist.count} songs</p>

        <p>{artist.count} uploaded songs</p>

        <button>+ Follow</button>
      </div>
    ))}
  </div>
</section>

      {/* TRENDING GENRES */}
      <section className="section">
  <h2>Trending Genres</h2>

  <div className="genre-grid">
      {trendingGenres.map((genre) => (
      <div className="genre-card" key={genre.name}>
        <div className="icon"></div>

        <h3>{genre.name}</h3>

        <p>{genre.count} songs</p>
      </div>
    ))}
  </div>
</section>

      {/* VIRAL PLAYLISTS */}
      <section className="section">
  <div className="section-header">
    <h2>Viral Playlists</h2>
  </div>

  <div className="playlist-grid">
    {playlists.map((playlist) => (
      <div className="playlist-card" key={playlist._id}>
        <img
          src="https://placehold.co/400x400?text=Playlist"
          alt={playlist.name}
        />

        <div className="card-content">
          <h3>{playlist.name}</h3>

          <p>{playlist.trackCount} Tracks</p>
        </div>
      </div>
    ))}
  </div>
</section>

    </div>
    <Footer/>
    </div>
    </>
  );
}

export default Trending;