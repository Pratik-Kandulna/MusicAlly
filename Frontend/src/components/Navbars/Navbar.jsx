import "./navbar.css";
import { FaBell } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Trending from "../Pages/Trending/Trending";

function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  // ✅ FIXED: inside component
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar" ref={menuRef}>
      <div className="nav-container">

        {/* LEFT */}
        <div className="nav-left">
          <span className="logo-icon">🎵</span>
          <h2 className="logo-text">MusicAlly</h2>
        </div>

        {/* CENTER */}
        <ul className="nav-links">
          <NavLink to="/">
          <li>Home</li>
          </NavLink>

          <li className="dropdown" onClick={() => toggleMenu("discover")}>
            Discover ▾
            {activeMenu === "discover" && (
              <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                <NavLink to="/Trending">
                <p>Trending Now</p>
                </NavLink>

                
                <NavLink to="/NewRelease">
                <p>New Releases</p>
                </NavLink>
                
                <NavLink to="/TopCharts">
                <p>Top Charts</p>
                </NavLink>
                
                <p>Browse All Genres</p>
              </div>
            )}
          </li>

          <li className="dropdown" onClick={() => toggleMenu("collections")}>
            Collections ▾
            {activeMenu === "collections" && (
              <div className="dropdown-menu">
                <NavLink to="/CreateAcc">
                <p>My Favorites</p>
                </NavLink>
                
                <NavLink to="/CreateAcc">
                <p>New Playlists</p>
                </NavLink>
                
                <NavLink to="/CreateAcc">
                <p>Create New Playlists</p>
                </NavLink>
                
              </div>
            )}
          </li>

          <li className="dropdown" onClick={() => toggleMenu("artists")}>
            Artists ▾
            {activeMenu === "artists" && (
              <div className="dropdown-menu">
                <p>Top Artists</p>
                <p>New Artists</p>
              </div>
            )}
          </li>

          <li>Community</li>
        </ul>

        {/* RIGHT */}
        <div className="nav-right">
          <div className="icon">
            <NavLink to="/CreateAcc">
             <img src="/images/notification.png"/>
            </NavLink>
            <span className="dot"></span>
          </div>

          <div className="icon">
            <img src="/images/search.png" />
          </div>

          <div className="icon">
            <NavLink to="/CreateAcc">
            <img src="/images/user.png" />
            </NavLink>
          </div>
          <NavLink to="/CreateAcc" className="cta-btn">
          Get Started
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;