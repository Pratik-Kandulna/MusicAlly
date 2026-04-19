import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./NewRelease.css";

const releases = [
  {
    title: "Echo Nights",
    artist: "Luna Waves",
    img: "/images/release1.jpg",
    date: "Apr 2026"
  },
  {
    title: "Neon Dreams",
    artist: "Nova Beats",
    img: "/images/release2.jpg",
    date: "Mar 2026"
  },
  {
    title: "Skyline",
    artist: "DJ Pulse",
    img: "/images/release3.jpg",
    date: "Mar 2026"
  },
  {
    title: "Golden Hour",
    artist: "Aurora",
    img: "/images/release4.jpg",
    date: "Feb 2026"
  },
  {
    title: "Midnight Drive",
    artist: "The Saxman",
    img: "/images/release5.jpg",
    date: "Feb 2026"
  },
  {
    title: "Electric Soul",
    artist: "Spectrum",
    img: "/images/release6.jpg",
    date: "Jan 2026"
  }
];

function NewRelease() {
  return (
    <>
      <div className="dashboard-container">
      

      <div className="newrelease-page">

        <SNavbar />

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