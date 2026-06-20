import "./MyFavourites.css";
import SNavbar from "../../DashNavBar/sNavbar";
import "../Home/dashboard.css";
import Footer from "../../Dashboard/Footer/Footer";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useOutletContext } from "react-router-dom";



function Favourites({setCurrentSong, setCurrentIndex, currentSong, currentUser,likedSongs, setLikedSongs, }) {

const {songs, setSongs, search, setSearch, playSong,} = useOutletContext();  

const [favourites, setFavourites] = useState([]);

const handleLike = async (songId) => {
  if (!currentUser) return;

  const userId = currentUser._id || currentUser.id;
  const isLiked = likedSongs.some(
  id => String(id) === String(songId)
);

  try {
    if (isLiked) {
      await axios.post("http://localhost:3000/api/auth/unlike", {
        userId,
        songId,
      });

      setLikedSongs((prev) =>
        prev.filter((id) => String(id) !== String(songId))
      );
      setFavourites((prev) =>
        prev.filter((song) => String(song._id) !== String(songId))
      );
    } else {
  await axios.post("http://localhost:3000/api/auth/like", {
    userId,
    songId,
  });

  setLikedSongs((prev) => [...prev, songId]);
}
  } catch (err) {
    console.error(err);
  }
  
};



useEffect(() => {
  if (!currentUser) return;

  axios
    .get(`http://localhost:3000/api/auth/favourites/${currentUser.id}`)
    .then((res) => {
      setFavourites(res.data);
      setLikedSongs(res.data.map(song => song._id));
    })
    
    .catch((err) => {
      console.log(err);
    });
}, [currentUser]);
console.log(favourites[0]);
console.log("Current user:", currentUser);
console.log("Favourites:", favourites);
console.log("likedSongs:", likedSongs);
console.log(
  "favourites:",
  favourites.map((s) => ({
    id: s._id,
    title: s.title,
  }))
);

  return (
    <>
      <div className="dashboard-container">

      <div className="fav-page">
        

        {/* HERO */}
        <div className="fav-hero">
          <h1>My Favourites</h1>
          <p>Your saved songs & playlists</p>
        </div>

        {/* SONG LIST */}
        <div className="fav-section">
          <h2>❤️ Saved Tracks</h2>

          <div className="fav-list">
            {favourites.map((song) => {

            console.log({
              songId: song._id,
              likedSongs,
              includes: likedSongs.includes(song._id),
              some: (likedSongs || []).some(
              (id) => String(id) === String(song._id)
              ),
            });

          return(
              
            <div className="fav-card" 
              onClick={() => {
                playSong(song, favourites);
              }}
              
            key={song._id}>
                <img
                  src={`http://localhost:3000/${song.coverImage}`}
                  alt={song.title}
                />

                <div className="fav-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                  <span className="plays">{song.genre}</span>
                </div>
                
                  
                {(likedSongs || []).some((id) => String(id) === String(song._id)) ? (
                  
                  <FaHeart
                  
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(song._id);
                    }}
                  />
                ) : (
                  <FaRegHeart
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(song._id);
                    }}
                  />
                  
                )}      
              </div>
          );
        })} 
        
              
            
          </div>

        </div>

        <Footer/>

      </div>
      </div>
    </>
  );
}

export default Favourites;