import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import Trending from "./components/Pages/Trending/Trending";
import TopCharts from "./components/Pages/TopCharts/TopCharts";
import NewRelease from "./components/Pages/NewRelease/NewRelease";
import AllGenres from "./components/Pages/AllGenres/AllGenres";
import Dashboard from "./components/Pages/Home/Dashboard";
import Browse from "./components/Pages/Browse/Browse";
import Favourites from "./components/Pages/MyFavourites/MyFavourites";
import Playlists from "./components/Pages/MyPlaylists/MyPlaylists";
import SavedAlbums from "./components/Pages/SavedAlbums/SavedAlbums";
import Profile from "./components/Pages/Profile/Profile";
import CreateAcc from "./components/Pages/Login/CreateAcc";
import Upload from "./components/Pages/Upload/Upload";
import MainLayout from "./components/MainLayout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);


  const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("http://localhost:3000/api/songs")
    .then(res => res.json())
    .then(data => {
      console.log("BACKEND DATA:", data);
      setSongs(data);
      setLoading(false);
    })
    .catch(err => console.log(err));
  }, []);


  const filteredSongs = (songs || []).filter(song => {
    const title = song.title?.toLowerCase() || "";
    const artist = song.artist?.toLowerCase() || "";
    const query = search?.toLowerCase() || "";
  
    if (!query) return true;
  
    return title.includes(query) || artist.includes(query);
  });

  useEffect(() => {
  if (!currentUser) return;

  axios
    .get(`http://localhost:3000/api/auth/favourites/${currentUser.id}`)
    .then((res) => {
      // Store only song IDs
      setLikedSongs(res.data.map((song) => song._id));
    })
    .catch(console.error);
}, [currentUser]);


  return (
    <>   
    <Routes>

  {/* ❌ NO NAVBAR PAGES */}
  <Route path="/" element={<Home />} />
  <Route path="/Login" element={<Login />} />
  <Route path="/CreateAcc" element={<CreateAcc />} />

  {/* ✅ WITH NAVBAR */}
  <Route
    element={
      <MainLayout
        songs={songs}
        currentUser={currentUser}
        setSongs={setSongs}
        search={search}
        setSearch={setSearch}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        likedSongs={likedSongs}
        setLikedSongs={setLikedSongs}
      />
    }
  >
    
    <Route path="/Dashboard"element={
    <ProtectedRoute>
      <Dashboard 
        currentUser={currentUser}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </ProtectedRoute>
  }
    />
    
    <Route
  path="/Browse"
  element={
    <ProtectedRoute>
      <Browse currentUser={currentUser} />
    </ProtectedRoute>
  }
/>

<Route
  path="/Trending"
  element={
    <ProtectedRoute>
      <Trending currentUser={currentUser}/>
    </ProtectedRoute>
  }
/>

<Route
  path="/TopCharts"
  element={
    <ProtectedRoute>
      <TopCharts currentUser={currentUser}/>
    </ProtectedRoute>
  }
/>

<Route
  path="/NewRelease"
  element={
    <ProtectedRoute>
      <NewRelease currentUser={currentUser}/>
    </ProtectedRoute>
  }
/>

<Route
  path="/AllGenres"
  element={
    <ProtectedRoute>
      <AllGenres currentUser={currentUser}/>
    </ProtectedRoute>
  }
  />

<Route
  path="/MyFavourites"
  element={
    <ProtectedRoute>
      <Favourites 
        songs={songs}
        setCurrentSong={setCurrentSong}
        setCurrentIndex={setCurrentIndex}
        currentSong={currentSong}
        currentUser={currentUser}
        likedSongs={likedSongs}
        setLikedSongs={setLikedSongs}
      />
    </ProtectedRoute>
  }
/>

<Route
  path="/MyPlaylists"
  element={
    <ProtectedRoute>
      <Playlists currentUser={currentUser}/>
    </ProtectedRoute>
  }
/>

<Route
  path="/SavedAlbums"
  element={
    <ProtectedRoute>
      <SavedAlbums currentUser={currentUser} />
    </ProtectedRoute>
  }
/>

<Route
  path="/Profile"
  element={
    <ProtectedRoute>
      <Profile currentUser={currentUser}/>
    </ProtectedRoute>
  }
/>

<Route
  path="/Upload"
  element={
    <ProtectedRoute>
      <Upload />
    </ProtectedRoute>
  }
/>
   
  </Route>

</Routes>
    
    </>
  );
}

export default App;