import "./Playlists.css";

const playlists = [
  {
    title: "Workout Mix",
    tracks: "45 tracks • 3h 12m",
    img: "/images/workout.jpg",
  },
  {
    title: "Chill Vibes",
    tracks: "32 tracks • 2h 24m",
    img: "/images/chill.jpg",
  },
  {
    title: "Study Focus",
    tracks: "28 tracks • 2h 45m",
    img: "/images/study.jpg",
  },
  {
    title: "Party Hits",
    tracks: "52 tracks • 3h 48m",
    img: "/images/party.jpg",
  },
];

function Playlists() {
  return (
    <div className="playlist-section">
      
      {/* HEADER */}
      <div className="playlist-header">
        <h2>Your Playlists</h2>
        <button className="create-btn">+ Create Playlist</button>
      </div>

      {/* GRID */}
      <div className="playlist-grid">
        {playlists.map((item, index) => (
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

export default Playlists;