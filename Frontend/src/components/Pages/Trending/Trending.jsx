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
const artistMap = {};

safeSongs.forEach((song) => {
  if (!artistMap[song.artist]) {
    artistMap[song.artist] = {
      name: song.artist,
      image: `http://localhost:3000/${song.coverImage}`,
      totalPlays: 0,
      songCount: 0,
    };
  }

  artistMap[song.artist].totalPlays += song.plays || 0;
  artistMap[song.artist].songCount += 1;
});

const breakoutArtists = Object.values(artistMap)
  .sort((a, b) => {
    if (b.totalPlays !== a.totalPlays) {
      return b.totalPlays - a.totalPlays;
    }
    return b.songCount - a.songCount;
  })
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
  const genreMap = {};

safeSongs.forEach((song) => {
  const genre = song.genre || "Other";

  if (!genreMap[genre]) {
    genreMap[genre] = {
      name: genre,
      totalPlays: 0,
      songCount: 0,
    };
  }

  genreMap[genre].totalPlays += song.plays || 0;
  genreMap[genre].songCount += 1;
});

const trendingGenres = Object.values(genreMap)
  .sort((a, b) => b.totalPlays - a.totalPlays)
  .slice(0, 6);

const [playlists, setPlaylists] = useState([]);
const [selectedGenre, setSelectedGenre] = useState(null);
const [genreSongs, setGenreSongs] = useState([]);

const handleGenreClick = (genreName) => {
  const filtered = safeSongs.filter(
    (song) => song.genre?.toLowerCase() === genreName.toLowerCase()
  );
  setSelectedGenre(genreName);
  setGenreSongs(filtered);
};

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
      <img src={artist.image} alt={artist.name} />

      <h3>{artist.name}</h3>

      <p>🎵 {artist.songCount} songs</p>

      <p>🔥 {artist.totalPlays} plays</p>

      <button
        onClick={() => {
          const artistSongs = safeSongs.filter(
            (s) => s.artist === artist.name
          );

          if (artistSongs.length > 0) {
            playSong(artistSongs[0], artistSongs);
          }
        }}
      >
        ▶ Play Artist
      </button>
    </div>
  ))}
</div>
</section>

      {/* TRENDING GENRES */}
      <section className="section">
  <h2>Trending Genres</h2>

  <div className="genre-grid">
      {trendingGenres.map((genre) => (
      <div
        className="genre-card"
        key={genre.name}
        onClick={() => handleGenreClick(genre.name)}
      >
        <div className="icon"></div>

        <h3>{genre.name}</h3>

        <p>🎵 {genre.songCount} songs</p>
        <p>🔥 {genre.totalPlays} plays</p>
      </div>
    ))}
  </div>
</section>

{selectedGenre && (
  <section className="section">
    <div className="section-header">
      <h2>🎵 {selectedGenre} Songs</h2>
    </div>
    <div className="genre-songs-grid">
      {genreSongs.map((song) => (
        <div className="trend-card" key={song._id}>
          <div className="image-wrapper">
            <img src={`http://localhost:3000/${song.coverImage}`} alt={song.title} />
            <div className="overlay">
              <button
                className="overlay-play-btn"
                onClick={() => playSong(song, genreSongs)}
              >
                ▶
              </button>
            </div>
          </div>
          <div className="card-content">
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <small>{song.plays || 0} plays</small>
            <div className="card-actions">
              <button className="Tplay-btn" onClick={() => playSong(song, genreSongs)}>
                ▶ Play
              </button>
              <button className="add-btn" onClick={() => handleAddToPlaylist(song._id)}>
                ➕ Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)}

      {/* VIRAL PLAYLISTS */}
      <section className="section">
  <div className="section-header">
    <h2>Viral Playlists</h2>
  </div>

  <div className="playlist-grid">
    {playlists.map((playlist) => (
      <div className="playlist-card" key={playlist._id}>
        <img
          src={
            playlist.songs?.[0]?.coverImage
              ? `http://localhost:3000/${playlist.songs[0].coverImage}`
              : "/images/playlist-placeholder.png"
          }
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
  
    </div>
    </>
  );
}

export default Trending;