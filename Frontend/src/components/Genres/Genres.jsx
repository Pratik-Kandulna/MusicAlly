import "./genres.css";

const genres = [
  { name: "Rock", icon: "🎸" },
  { name: "Pop", icon: "🎤" },
  { name: "Jazz", icon: "🎷" },
  { name: "Hip Hop", icon: "🔥" },
  { name: "Classical", icon: "🎻" },
  { name: "EDM", icon: "🎧" }
];

function Genres() {
  return (
    <section className="genres">
      <h2>Explore By Genres</h2>
      <p className="subtitle">Find your sound across diverse musical styles</p>

      <div className="genre-grid">
        {genres.map((g, i) => (
          <div className="genre-card" key={i}>
            <div className="icon-box">{g.icon}</div>
            <h3>{g.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Genres;