import "./MyFavourites.css";
import SNavbar from "../../DashNavBar/sNavbar";
import "../Home/dashboard.css";
import Footer from "../../Dashboard/Footer/Footer";

const favourites = [
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    img: "/images/trends.jpg",
    plays: "9.8M",
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    img: "/images/trends.jpg",
    plays: "8.4M",
  },
  {
    title: "Peaches",
    artist: "Justin Bieber",
    img: "/images/trends.jpg",
    plays: "7.2M",
  },
  {
    title: "Stay",
    artist: "The Kid LAROI",
    img: "/images/trends.jpg",
    plays: "6.5M",
  },
];

function Favourites() {
  return (
    <>
      <div className="dashboard-container">

      <div className="fav-page">

        <SNavbar />

        {/* HERO */}
        <div className="fav-hero">
          <h1>My Favourites</h1>
          <p>Your saved songs & playlists</p>
        </div>

        {/* SONG LIST */}
        <div className="fav-section">
          <h2>❤️ Saved Tracks</h2>

          <div className="fav-list">
            {favourites.map((song, i) => (
              <div className="fav-card" key={i}>
                <img src={song.img} alt="" />

                <div className="fav-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>

                <span className="plays">{song.plays}</span>

                <button className="play-btn">▶</button>
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

export default Favourites;