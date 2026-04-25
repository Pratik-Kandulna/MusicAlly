import "./Recommended.css";

const RPlaylists = [
  {
    title: "Cosmic Tunes",
    tracks: "45 tracks • 3h 12m",
    img: "/images/Cosmic Tunes.jpeg",
  },
  {
    title: "Nightfall Notes",
    tracks: "32 tracks • 2h 24m",
    img: "/images/Nightfall Notes.jpg",
  },
  {
    title: "Lost Souls",
    tracks: "28 tracks • 2h 45m",
    img: "/images/Lost Souls.jpeg",
  },
  {
    title: "verload",
    tracks: "52 tracks • 3h 48m",
    img: "/images/Overload.jpeg",
  },
];

function Recommended() {
  return (
    <div className="playlist-section">
      
      {/* HEADER */}
      <div className="playlist-header">
        <h2>Recommended Playlists</h2>
        <button className="create-btn">+ Create Playlist</button>
      </div>

      {/* GRID */}
      <div className="playlist-grid">
        {RPlaylists.map((item, index) => (
          <div className="playlist-card" key={index}>
            <img src={item.img} alt={item.title} />

            <div className="playlist-info">
              <h3>{item.title}</h3>
              <p>{item.tracks}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommended;