import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./NewRelease.css";
import { useOutletContext } from "react-router-dom";

const releases = [
  {
    title: "Echo Nights",
    artist: "Luna Waves",
    img: "/images/Echo Nights.jpeg",
    date: "Apr 2026"
  },
  {
    title: "Neon Dreams",
    artist: "Nova Beats",
    img: "/images/Neon Dreams.jpeg",
    date: "Mar 2026"
  },
  {
    title: "Skyline",
    artist: "DJ Pulse",
    img: "/images/Skyline.jpeg",
    date: "Mar 2026"
  },
  {
    title: "Golden Hour",
    artist: "Aurora",
    img: "/images/ Golden Hour.jpeg",
    date: "Feb 2026"
  },
  {
    title: "Midnight Drive",
    artist: "The Saxman",
    img: "/images/Midnight Drive.jpeg",
    date: "Feb 2026"
  },
  {
    title: "Electric Soul",
    artist: "Spectrum",
    img: "/images/Electric Soul.jpeg",
    date: "Jan 2026"
  }
];

function NewRelease() {

const { songs, setSongs, search, setSearch } = useOutletContext();


  return (
    <>
      <div className="dashboard-container">
      

      <div className="newrelease-page">

        

        {/* HERO */}
        <div className="newrelease-hero">
          <h1>New Releases</h1>
          <p>Fresh drops and latest hits just for you</p>
        </div>

        {/* RELEASE GRID */}
        <div className="release-section">
          <h2>Latest Albums & Singles</h2>

          <div className="release-grid">
            {releases.map((item, index) => (
              <div className="release-card" key={index}>
                <img src={item.img} alt="" />

                <div className="release-info">
                  <h3>{item.title}</h3>
                  <p>{item.artist}</p>
                  <span>{item.date}</span>
                </div>

                <button className="play-btn">▶ Play</button>
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

export default NewRelease;