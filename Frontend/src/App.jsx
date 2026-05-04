import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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


function App() {

  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);


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
        setSongs={setSongs}
        search={search}
        setSearch={setSearch}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    }
  >
    
    <Route path="/Dashboard" element={<Dashboard />} />
    <Route path="/Browse" element={<Browse />} />
    <Route path="/Trending" element={<Trending />} />
    <Route path="/Topcharts" element={<TopCharts />} />
    <Route path="/NewRelease" element={<NewRelease />} />
    <Route path="/AllGenres" element={<AllGenres />} />
    <Route path="/MyFavourites" element={<Favourites />} />
    <Route path="/MyPlaylists" element={<Playlists />} />
    <Route path="/SavedAlbums" element={<SavedAlbums />} />
    <Route path="/Profile" element={<Profile />} />
    <Route path="/Upload" element={<Upload />} />
  </Route>

</Routes>
    
    </>
  );
}

export default App;