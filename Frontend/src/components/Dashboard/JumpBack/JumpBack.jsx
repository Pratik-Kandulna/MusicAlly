import "./JumpBack.css";

function JumpBack() {
  return (
    <div className="jump-section">

      <h2>Jump Back In</h2>

      <div className="jump-container">

        {/* LEFT CARD */}
        <div className="jump-card large">

          <img
            src="/images/music.jpg"
            alt="current song"
            className="jump-img"
          />

          <div className="jump-info">
            <p className="small-text">Continue listening to</p>
            <h3>Electric Dreams</h3>
            <p className="artist">Luna Rivers</p>

            {/* PROGRESS BAR */}
            <div className="progress-bar">
              <div className="progress"></div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="jump-card">

          <img
            src="/images/playlist.jpg"
            alt="playlist"
            className="jump-img"
          />

          <div className="jump-info">
            <p className="small-text">Last played</p>
            <h3>Workout Mix 2026</h3>
            <p>Your Playlist • 45 songs</p>
            <p className="next">Next: "Thunder Strike"</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default JumpBack;