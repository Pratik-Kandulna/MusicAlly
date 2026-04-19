import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./Browse.css";

const categories = [
  { name: "Pop", color: "#ff4d8d" },
  { name: "Rock", color: "#ff8a00" },
  { name: "Hip Hop", color: "#ff9900" },
  { name: "Electronic", color: "#ff4db8" },
  { name: "Jazz", color: "#00c6ff" },
  { name: "Classical", color: "#7f7fd5" },
  { name: "R&B", color: "#00b894" },
  { name: "Country", color: "#f39c12" },
  { name: "Latin", color: "#ff5733" },
  { name: "K-Pop", color: "#e84393" },
  { name: "Indie", color: "#0984e3" },
  { name: "Metal", color: "#636e72" }
];

const artists = [
  { name: "The Weeknd", img: "/images/artist1.jpg" },
  { name: "Taylor Swift", img: "/images/artist2.jpg" },
  { name: "Drake", img: "/images/artist3.jpg" },
  { name: "Billie Eilish", img: "/images/artist4.jpg" }
];

function Browse() {
  return (
    <>
    
    <div className="dashboard-container">

      

      <div className="browse-page">

        <SNavbar />

        {/* HERO */}
        <div className="browse-hero">
          <h1>Browse</h1>
          <p>Discover music by mood, genre & artists</p>
        </div>

        {/* GENRES */}
        <div className="section">
          <h2>🎵 Browse Genres</h2>

          <div className="genre-grid">
            {categories.map((cat, i) => (
              <div
                className="genre-card"
                key={i}
                style={{ background: cat.color }}
              >
                <h3>{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* ARTISTS */}
        <div className="section">
          <h2>🔥 Popular Artists</h2>

          <div className="artist-row">
            {artists.map((artist, i) => (
              <div className="artist-card" key={i}>
                <img src={artist.img} alt="" />
                <p>{artist.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MOODS */}
        <div className="section">
          <h2>🎧 Mood Picks</h2>

          <div className="mood-grid">
            <div className="mood-card">Chill Vibes</div>
            <div className="mood-card">Workout</div>
            <div className="mood-card">Party</div>
            <div className="mood-card">Focus</div>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
    </>
  );
}

export default Browse;