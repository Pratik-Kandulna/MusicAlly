import "./MyPlaylists.css";
import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";


const playlists = [
  {
    title: "Chill Vibes",
    tracks: "24 tracks",
    img: "/images/trends.jpg",
  },
  {
    title: "Workout Hits",
    tracks: "18 tracks",
    img: "/images/trends.jpg",
  },
  {
    title: "Late Night",
    tracks: "32 tracks",
    img: "/images/trends.jpg",
  },
  {
    title: "Road Trip",
    tracks: "20 tracks",
    img: "/images/trends.jpg",
  },
];

function Playlists() {
  return (
    <>
      <div className="dashboard-container">

      <div className="playlist-page">

        <SNavbar />

        {/* HERO */}
        <div className="playlist-hero">
          <h1>My Playlists</h1>
          <p>Organize and enjoy your music collections</p>
        </div>

        {/* SECTION */}
        <div className="playlist-section">
          <div className="playlist-header">
            <h2>🎧 Your Collections</h2>
            <button className="create-btn">+ Create Playlist</button>
          </div>

          {/* GRID */}
          <div className="playlist-grid">
            {playlists.map((item, i) => (
              <div className="playlist-card" key={i}>
                <img src={item.img} alt="" />

                <div className="playlist-info">
                  <h3>{item.title}</h3>
                  <p>{item.tracks}</p>
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