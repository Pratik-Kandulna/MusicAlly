import "./Artists.css";

const artists = [
  { name: "Bruno Mars", img: "/images/Bruno.jpg" },
  { name: "The Weeknd", img: "/images/Weeknd.jpg" },
  { name: "Taylor Swift", img: "/images/Taylor.jpg" },
  { name: "Justin Bieber", img: "/images/Justin.jpg" }
];

function Artists() {
  return (
    <section className="artists">
     
      
        <div className="artists-header">
          <h2>Trending Artists</h2>
          <button className="view-all">View All</button>
        </div>
      

      <div className="artist-grid">
        {artists.map((a, i) => (
          <div className="artist-card" key={i}>
            <img src={a.img} alt="" />
            <h3>{a.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Artists;