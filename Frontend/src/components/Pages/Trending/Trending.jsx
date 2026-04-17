import "./Trending.css";

const songs = [
  { title: "Blinding Lights", artist: "The Weeknd" },
  { title: "Levitating", artist: "Dua Lipa" },
  { title: "Stay", artist: "Kid Laroi" },
  { title: "Shape of You", artist: "Ed Sheeran" }
];

function Trending() {
  return (
    <div className="trending">
      <h2>🔥 Trending Now</h2>

      <div className="song-list">
        {songs.map((s, i) => (
          <div className="song-card" key={i}>
            <h3>{s.title}</h3>
            <p>{s.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending;