import "./Why.css";

const data = [
  { title: "Curated Collections", desc: "Handpicked playlists" },
  { title: "Community Driven", desc: "Music lovers connect" },
  { title: "Trending Tracks", desc: "Latest hits" }
];

function Why() {
  return (
    <section className="why">
      <h2>Why Choose MusicAlly</h2>

      <div className="why-grid">
        {data.map((item, i) => (
          <div className="why-card" key={i}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Why;