import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import Trending from "./components/Pages/Browse/Browse";
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
import SNavbar from "./components/DashNavBar/sNavbar";

function App() {

  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState([]);


  const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("http://localhost:3000/api/songs")
    .then(res => res.json())
    .then(data => {
      setSongs(data);
      setLoading(false);
      if (loading) return <h2>Loading...</h2>;
        })
        .catch(err => console.log("ERROR:", err));
    }, []);



  return (
    <>   
    <Routes>
      <Route path="/" element={<Home songs={songs} />} />
      <Route path="/CreateAcc" element={<CreateAcc />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Trending" element={<Trending />} />
      <Route path="/Topcharts" element={<TopCharts />} />
      <Route path="/NewRelease" element={<NewRelease />} />
      <Route path="/AllGenres" element={<AllGenres />} />
      <Route path="/Dashboard" element={ <> <SNavbar search={search} setSearch={setSearch} />
                                        <Dashboard songs={songs} 
                                          setSongs={setSongs} 
                                          search={search} 
                                          setSearch={setSearch}
                                          />
                                          </>
                                        } />
      <Route path="/Browse" element={<Browse />} />
      <Route path="/Myfavourites" element={<Favourites />} />
      <Route path="/MyPlaylists" element={<Playlists />} />
      <Route path="/SavedAlbums" element={<SavedAlbums />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Upload" element={<Upload />} />
    </Routes>
    
    </>
  );
}

export default App;