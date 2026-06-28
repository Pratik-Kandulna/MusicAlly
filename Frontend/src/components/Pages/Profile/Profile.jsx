import "./Profile.css";
import "../Home/dashboard.css";
import Footer from "../../Dashboard/Footer/Footer";
import SNavbar from "../../DashNavBar/sNavbar";
import { useOutletContext } from "react-router-dom";

function Profile() {

const { songs, likedSongs = [], playlists = [] } = useOutletContext();
const user = JSON.parse(localStorage.getItem("user"));
const recentSongs = [...(songs || [])]
  .filter((s) => likedSongs.some((id) => String(id) === String(s._id)))
  .sort((a, b) => (b.plays || b.playCount || 0) - (a.plays || a.playCount || 0))
  .slice(0, 5);
const uniqueArtists = [...new Set((songs || []).map((s) => s.artist).filter(Boolean))];
const uniqueAlbums = [...new Set((songs || []).map((s) => s.album).filter(Boolean))];

const totalPlays = (songs || []).reduce(
  (sum, song) => sum + (song.plays || song.playCount || 0),
  0
);

const genreCounts = (songs || []).reduce((acc, song) => {
  if (song.genre) acc[song.genre] = (acc[song.genre] || 0) + 1;
  return acc;
}, {});
const topGenre =
  Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

const artistCounts = (songs || []).reduce((acc, song) => {
  if (song.artist) acc[song.artist] = (acc[song.artist] || 0) + (song.plays || song.playCount || 1);
  return acc;
}, {});
const topArtist =
  Object.entries(artistCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';


  return (
    <>
     <div className="dashboard-container">
      
      <div className="profile-page">

        

        {/* HEADER */}
        <div className="profile-header">
          <img src="/images/user.png" alt="profile" />

          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p>Music Lover 🎧 | Night vibes</p>
            <span>{user?.email}</span>

            <button className="edit-btn">Edit Profile</button>
          </div>
        </div>

        {/* STATS */}
        <div className="profile-stats">
          <div className="stat-card">
            <h3>{totalPlays}</h3>
            <p>Total Plays</p>
          </div>

          <div className="stat-card">
            <h3>{topGenre}</h3>
            <p>Top Genre</p>
          </div>

          <div className="stat-card">
            <h3>{topArtist}</h3>
            <p>Top Artist</p>
          </div>

          <div className="stat-card">
            <h3>{likedSongs.length}</h3>
            <p>Liked Songs</p>
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="profile-section">
          <h2>Recently Played</h2>

          <div className="recent-list">
            {recentSongs.length ? recentSongs.map((song) => (
              <div className="recent-item" key={song._id}>
                <img src={`http://localhost:3000/${song.coverImage}`} alt={song.title} />
                <div>
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                </div>
              </div>
            )) : <p>No recent liked songs.</p>}
          </div>
        </div>

        {/* LIBRARY */}
        <div className="profile-section">
          <h2>Your Library</h2>

          <div className="library-cards">
            <div className="lib-card">
              <h3>{Array.isArray(playlists) ? playlists.length : 0}</h3>
              <p>Playlists</p>
            </div>

            <div className="lib-card">
              <h3>{uniqueAlbums.filter(Boolean).length}</h3>
              <p>Albums</p>
            </div>

            <div className="lib-card">
              <h3>{likedSongs.length}</h3>
              <p>Liked Songs</p>
            </div>
          </div>
        </div>

      </div>
    
      </div>
    </>
  );
}

export default Profile;