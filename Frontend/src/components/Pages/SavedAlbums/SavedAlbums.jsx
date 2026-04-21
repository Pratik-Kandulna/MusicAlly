import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./SavedAlbums.css";


const albums = [
  {
    title: "After Hours",
    artist: "The Weeknd",
    img: "/images/trends.jpg",
    year: "2020",
  },
  {
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    img: "/images/trends.jpg",
    year: "2020",
  },
  {
    title: "Justice",
    artist: "Justin Bieber",
    img: "/images/trends.jpg",
    year: "2021",
  },
  {
    title: "Divide",
    artist: "Ed Sheeran",
    img: "/images/trends.jpg",
    year: "2017",
  },
];

function SavedAlbums() {
  return (
    <>
    <div className="dashboard-container">
      

      <div className="albums-page">

        <SNavbar />

        {/* HERO */}
        <div className="albums-hero">
          <h1>Saved Albums</h1>
          <p>Your favorite albums in one place</p>
        </div>

        {/* SECTION */}
        <div className="albums-section">

          <h2>💿 Your Albums</h2>

          <div className="albums-grid">
            {albums.map((album, i) => (
              <div className="album-card" key={i}>
                <img src={album.img} alt="" />

                <div className="album-info">
                  <h3>{album.title}</h3>
                  <p>{album.artist}</p>
                  <span>{album.year}</span>
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

export default SavedAlbums;