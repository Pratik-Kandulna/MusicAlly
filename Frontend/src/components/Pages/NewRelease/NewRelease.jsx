import "./NewRelease.css";

const releases = [
  { title: "New Song 1", artist: "Artist A" },
  { title: "New Song 2", artist: "Artist B" },
  { title: "New Song 3", artist: "Artist C" }
];

function NewRelease() {
  return (
    <div className="new-release">
      <h2>🆕 New Releases</h2>

      <div className="release-grid">
        {releases.map((r, i) => (
          <div className="release-card" key={i}>
            <h3>{r.title}</h3>
            <p>{r.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewRelease;