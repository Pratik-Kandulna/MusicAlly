import "./Profile.css";
import "../Home/dashboard.css";
import Footer from "../../Dashboard/Footer/Footer";
import SNavbar from "../../DashNavBar/sNavbar";
import { useOutletContext } from "react-router-dom";

function Profile() {

const { songs, setSongs, search, setSearch } = useOutletContext();
const user = JSON.parse(localStorage.getItem("user"));


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
            <h3>1200+</h3>
            <p>Songs Played</p>
          </div>

          <div className="stat-card">
            <h3>Pop</h3>
            <p>Top Genre</p>
          </div>

          <div className="stat-card">
            <h3>The Weeknd</h3>
            <p>Top Artist</p>
          </div>

          <div className="stat-card">
            <h3>340 hrs</h3>
            <p>Listening Time</p>
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="profile-section">
          <h2>Recently Played</h2>

          <div className="recent-list">
            <div className="recent-item">
              <img src="/images/trends.jpg" />
              <div>
                <h4>Blinding Lights</h4>
                <p>The Weeknd</p>
              </div>
            </div>

            <div className="recent-item">
              <img src="/images/trends.jpg" />
              <div>
                <h4>Levitating</h4>
                <p>Dua Lipa</p>
              </div>
            </div>
          </div>
        </div>

        {/* LIBRARY */}
        <div className="profile-section">
          <h2>Your Library</h2>

          <div className="library-cards">
            <div className="lib-card">
              <h3>12</h3>
              <p>Playlists</p>
            </div>

            <div className="lib-card">
              <h3>8</h3>
              <p>Albums</p>
            </div>

            <div className="lib-card">
              <h3>45</h3>
              <p>Liked Songs</p>
            </div>
          </div>
        </div>

      </div>
      <Footer/>
      </div>
    </>
  );
}

export default Profile;