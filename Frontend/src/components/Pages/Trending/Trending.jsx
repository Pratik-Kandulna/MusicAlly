import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./Trending.css";
import { useOutletContext } from "react-router-dom";

function Trending() {

const { songs, setSongs, search, setSearch, setCurrentSong, currentSong } = useOutletContext();
const safeSongs = songs || [];

const trendingSongs = safeSongs.slice(0, 6);

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
      <div className="section">
        <h2>🔥 Trending Now</h2>

        <div className="cards" >
          {trendingSongs.map((song, i) => (
            <div className="trend-card"  onClick={() => setCurrentSong(song)} key={i}>
              <span className="rank">{i+1}</span>
              <span className="growth">+{200 - i*30}%</span>

              <div 
                className="image-wrapper"
                onClick={() => setCurrentSong(song)}
              >
                 <img src={`http://localhost:3000/${song.coverImage}`} />

                    <div className="overlay">
                      <button
                        className="play-btn"
                        onClick={(e) => {
                        e.stopPropagation();
                        if (currentSong?._id === song._id) {
                        // same song → toggle play/pause handled in MainLayout
                        } else {
                                setCurrentSong(song);
                          }
                        }}
                      >
                        {currentSong?._id === song._id ? "⏸" : "▶"}
                      
                      </button>
                    </div>
                </div>

              <div className="card-content" onClick={() => setCurrentSong(song)} >
                <p className="genre">{song.genre || "Music"}</p>
                <h3>{song.title}</h3>
                <p className="artist">{song.artist}</p>
                <div className="plays">
                  <span>4.3M plays</span>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="play-btn"
                  onClick={() => setCurrentSong(song)}
                  >
                    PLAY
                </button>
                <button>♡</button>
                <button>↗</button>
              </div>
            </div>
            
          ))}
        </div>
      </div>

      {/* BREAKOUT ARTISTS */}
      <div className="section">
        <div className="section-header">
          <h2>Breakout Artists</h2>
          <button>View All</button>
        </div>

        <div className="cards">
          {breakoutArtists.map((artist, i) => (
          <div className="artist-card" 
          key={i}
          onClick={() => handleArtistClick(artist.name)}>
            <span className="growth">+{300 - i * 50}%</span>
            <img src={`http://localhost:3000/${artist.cover}`} />
            <h3>{artist.name}</h3>
            

            <div className="artist-footer">
              <p>{artist.count} songs</p>
              <span>{(artist.count * 0.5).toFixed(1)}M</span>
              <button
                onClick={(e) => e.stopPropagation()}
              >
                + Follow
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* TRENDING GENRES */}
      <div className="section">
        <h2>Trending Genres</h2>

        <div className="genre-grid">
          {trendingGenres.map((genre, i) => (
          <div className="genre-card" 
          key={i}
          onClick={() => handleGenreClick(genre.name)}
        >
            <div className="icon"></div>

              <h3
              onClick={() => handleGenreClick(genre)}
              >{genre.name}</h3>
              <p>{genre.count} tracks</p>

              <span className="growth">+150%</span>
            </div>
          ))}
        </div>
      </div>

      {/* VIRAL PLAYLISTS */}
      <div className="section">
        <div className="section-header">
          <h2>Viral Playlists</h2>
          <button>Explore More</button>
        </div>

        <div className="cards">
          {["TikTok Viral Hits","Trending Now","Viral Hits 2026","Hot Right Now"].map((p,i)=>(
            <div className="playlist-card" key={i}>
              <span className="tag">🔥 Viral</span>
              <img src={`/images/playlist${i+1}.jpg`} />

              <h3>{p}</h3>
              <p>by MusicAlly</p>

              <div className="playlist-footer">
                <span>50 tracks</span>
                <span>2.5M</span>
              </div>
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

export default Trending;