import "./sNavbar.css";
import { FaBell } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Trending from "../Pages/Trending/Trending";

function SNavbar() {
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
    <nav className="snavbar" ref={menuRef}>
      <div className="snav-container">

        {/* LEFT */}
        <div className="snav-left">
          <span className="slogo-icon">🎵</span>
          <h2 className="slogo-text">MusicAlly</h2>
        </div>

        {/* CENTER */}
        <ul className="snav-links">
          <NavLink to="/">
          <li>Home</li>
          </NavLink>

          <li className="sdropdown" onClick={() => toggleMenu("discover")}>
            Discover ▾
            {activeMenu === "discover" && (
              <div className="sdropdown-menu" onClick={(e) => e.stopPropagation()}>
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

          <li className="sdropdown" onClick={() => toggleMenu("collections")}>
            Collections ▾
            {activeMenu === "collections" && (
              <div className="sdropdown-menu">
                <NavLink to="/Login">
                <p>My Favorites</p>
                </NavLink>
                
                <NavLink to="/Login">
                <p>New Playlists</p>
                </NavLink>
                
                <NavLink to="/Login">
                <p>Create New Playlists</p>
                </NavLink>
                
              </div>
            )}
          </li>

          <li className="sdropdown" onClick={() => toggleMenu("artists")}>
            Artists ▾
            {activeMenu === "artists" && (
              <div className="sdropdown-menu">
                <p>Top Artists</p>
                <p>New Artists</p>
              </div>
            )}
          </li>

          <li>Community</li>
        </ul>

        {/* RIGHT */}
        <div className="snav-right">
          <div className="sicon">
            <NavLink to="/Login">
             <img src="/images/notification.png"/>
            </NavLink>
            <span className="sdot"></span>
          </div>

          <div className="sicon">
            <img src="/images/search.png" />
          </div>

          <div className="sicon">
            <NavLink to="/Login">
            <img src="/images/user.png" />
            </NavLink>
          </div>
          <NavLink to="/Login" className="scta-btn">
          Get Started
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

export default SNavbar;