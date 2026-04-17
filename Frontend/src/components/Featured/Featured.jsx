import { NavLink } from "react-router-dom";
import "./featured.css";

const featuredData = [
  {
    title: "Vinyl Classics",
    desc: "Timeless records from the golden era",
    img: "/images/vinyl.jpg"
  },
  {
    title: "Live & Electric",
    desc: "Experience the energy of live performances",
    img: "/images/electric.jpg"
  },
  {
    title: "Studio Sessions",
    desc: "Behind the scenes with top producers",
    img: "/images/studio.jpg"
  },
  {
    title: "Guitar Legends",
    desc: "Masters of strings and melodies",
    img: "/images/guitar.jpg"
  }
];

function Featured() {
  return (
    <section className="featured">
      <h2>Featured Collections</h2>
      <p className="subtitle">Curated playlists for you</p>

      <div className="featured-grid">
        {featuredData.map((item, index) => (
          <div className="featured-card" key={index}>
            <NavLink to="/Login">
            <img src={item.img} alt={item.title} />
            <div className="overlay">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Featured;