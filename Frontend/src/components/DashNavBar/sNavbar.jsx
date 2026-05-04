import "./sNavbar.css";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";





function SNavbar({ setCurrentSong, songs, search, setSearch }) {

  

  const searchRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const location = useLocation();
  useEffect(() => {
  setActiveMenu(null); // close dropdown on page change

}, [location]);

  // ✅ FIXED: inside component
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }

     // 🔥 close search dropdown
     if (searchRef.current && !searchRef.current.contains(e.target)) {
      
    }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);


  }, []);

{/**************-FILTER-SONGS-***************/}
  const filteredSongs = (songs || []).filter(song => {
  const title = song.title?.toLowerCase?.() || "";
  const artist = song.artist?.toLowerCase?.() || "";
  const query = search?.toLowerCase() || "";

  if (!query.trim()) return false;

  return title.includes(query) || artist.includes(query);
});



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
          <li>

    <NavLink to="/Dashboard">Home</NavLink>

  </li>

  <li className="sdropdown" onClick={() => toggleMenu("discover")}>

    Discover

    {activeMenu === "discover" && (

      <div className="sdropdown-menu" onClick={(e) => e.stopPropagation()}>

        <NavLink to="/Trending" onClick={(e) => e.stopPropagation()}>
               Trending Now
        </NavLink>
        <NavLink to="/NewRelease" onClick={(e) => e.stopPropagation()}>
  New Releases
</NavLink>
<NavLink to="/TopCharts" onClick={(e) => e.stopPropagation()}>
  Top Charts
</NavLink>
<NavLink to="/AllGenres" onClick={(e) => e.stopPropagation()}>
  Browse All Genres
</NavLink>

      </div>

    )}

  </li>

  <li className="browse">

    <NavLink to="/Browse">

      <FaSearch />

      Browse

    </NavLink>

  </li>
          

          <li className="sdropdown" onClick={() => toggleMenu("collections")}>
            Collections ▾
            {activeMenu === "collections" && (
              <div className="sdropdown-menu">
                <NavLink to="/MyFavourites">
                My Favorites
                </NavLink>
                
                <NavLink to="/MyPlaylists">
                My Playlists
                </NavLink>
                
                

                <NavLink to="/SavedAlbums">
                Saved Albums
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

          <div className="search-bar" ref={searchRef}>
            <input
                type="text"
                placeholder="Search songs, artists..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}        
            />
            {search?.trim() && (
            <div className="search-dropdown">
              {filteredSongs.length > 0 ? (
                filteredSongs.slice(0, 5).map((song, index) => (
                <div
                  key={song._id}
                  className="search-item"
                  onClick={() => {
                    setCurrentSong(song);
                    setSearch(""); // close dropdown
                    setActiveMenu(null); // close dropdowns also
                  }}
                >
            <img
              src={`http://localhost:3000/${song.coverImage}`}
              width="40"
            />
            <div>
              <p>{song.title}</p>
              <small>{song.artist}</small>
            </div>
          </div>
        ))
      ) : (
        search?.trim() && filteredSongs.length === 0 && (
          <p className="no-result">No results</p>
        )
      )}
    </div>
  )}

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