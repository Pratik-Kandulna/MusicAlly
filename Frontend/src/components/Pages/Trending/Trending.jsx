import SNavbar from "../../DashNavBar/sNavbar";
import Footer from "../../Dashboard/Footer/Footer";
import "../Home/dashboard.css";
import "./Trending.css";

function Trending() {
  return (
    <>
    <div className="dashboard-container">
    
    
    <div className="trending-page">
      <SNavbar/>

      {/* HERO */}
      <div className="trending-hero">
        <span className="badge">🔥 Updated in Real-Time</span>

        <h1>Trending</h1>
        <p>Discover what's hot right now across all platforms and genres</p>

        <div className="update-box">
          <span>⏱ Last updated</span>
          <strong>5 minutes ago</strong>
        </div>
      </div>

      {/* TRENDING NOW */}
      <div className="section">
        <h2>🔥 Trending Now</h2>

        <div className="cards">
          {[1,2,3].map((item, i) => (
            <div className="trend-card" key={i}>
              <span className="rank">{i+1}</span>
              <span className="growth">+{200 - i*30}%</span>

              <img src={`/images/trends.jpg`} />

              <div className="card-content">
                <p className="genre">Pop</p>
                <h3>Summer Heat</h3>
                <p className="artist">Tropical Waves</p>

                <div className="plays">
                  <span>4.3M plays</span>
                  <div className="bar"></div>
                </div>
              </div>

              <div className="card-actions">
                <button className="play-btn">▶ Play</button>
                <button>♡</button>
                <button>↗</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BREAKOUT ARTISTS */}
      <div className="section">
        <div className="section-header">
          <h2>Breakout Artists</h2>
          <button>View All</button>
        </div>

        <div className="cards">
          {["Neon Dreams","Velvet Sky","Bass Prophet","Lunar Echo"].map((name,i)=>(
            <div className="artist-card" key={i}>
              <span className="growth">+{300 - i*50}%</span>
              <img src={`/images/artist${i+1}.jpg`} />

              <h3>{name}</h3>
              <p>Genre</p>

              <div className="artist-footer">
                <span>2.1M</span>
                <button>+ Follow</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRENDING GENRES */}
      <div className="section">
        <h2>Trending Genres</h2>

        <div className="genre-grid">
          {["Hyperpop","Afrobeats","Lo-fi Hip Hop","K-Pop","Latin Trap","Bedroom Pop"].map((g,i)=>(
            <div className="genre-card" key={i}>
              <div className="icon"></div>
              <h3>{g}</h3>
              <p>10K tracks</p>
              <span className="growth">+150%</span>
            </div>
          ))}
        </div>
      </div>

      {/* VIRAL PLAYLISTS */}
      <div className="section">
        <div className="section-header">
          <h2>Viral Playlists</h2>
          <button>Explore More</button>
        </div>

        <div className="cards">
          {["TikTok Viral Hits","Trending Now","Viral Hits 2026","Hot Right Now"].map((p,i)=>(
            <div className="playlist-card" key={i}>
              <span className="tag">🔥 Viral</span>
              <img src={`/images/playlist${i+1}.jpg`} />

              <h3>{p}</h3>
              <p>by MusicAlly</p>

              <div className="playlist-footer">
                <span>50 tracks</span>
                <span>2.5M</span>
              </div>
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

export default Trending;