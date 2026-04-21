import "./sNavbar.css";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";



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
          <NavLink to="/Dashboard">
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
                
                <NavLink to="/AllGenres">
                <p>Browse All Genres</p>
                </NavLink>
              </div>
            )}
          </li>
          
          <NavLink to="/Browse"> 
          <li className="browse">
           <FaSearch/>
           Browse
           </li>
          </NavLink>

          <li className="sdropdown" onClick={() => toggleMenu("collections")}>
            Collections ▾
            {activeMenu === "collections" && (
              <div className="sdropdown-menu">
                <NavLink to="/MyFavourites">
                <p>My Favorites</p>
                </NavLink>
                
                <NavLink to="/MyPlaylists">
                <p>My Playlists</p>
                </NavLink>
                
                

                <NavLink to="/SavedAlbums">
                <p>Saved Albums</p>
                </NavLink>
                
              </div>
            )}
          </li>
            {/*
          <li className="sdropdown" onClick={() => toggleMenu("artists")}>
            Artists ▾
            {activeMenu === "artists" && (
              <div className="sdropdown-menu">
                <p>Top Artists</p>
                <p>New Artists</p>

                <NavLink to="/Login">
                <p>Followed Artists</p>
                </NavLink>

              </div>
            )}
          </li>
          */}

        </ul>
        

        {/* RIGHT */}
        <div className="snav-right">

          <div className="search-bar">
            <input
                type="text"
                placeholder="Search songs, artists..."
               
            />

          </div>

          <div className="sicon">
            <NavLink to="/Login">
             <img src="/images/notification.png"/>
            </NavLink>
            <span className="sdot"></span>
          </div>

          

          <div className="sicon">

            <NavLink to="/Profile">
            <img src="/images/user.png" />
            </NavLink>
            
          </div>
            
          
          
        

        </div>

      </div>
    </nav>
  );
}

export default SNavbar;