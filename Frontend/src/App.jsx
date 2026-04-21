import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import Trending from "./components/Pages/Trending/Trending";
import TopCharts from "./components/Pages/TopCharts/TopCharts";
import NewRelease from "./components/Pages/NewRelease/NewRelease";
import Dashboard from "./components/Pages/Home/Dashboard";
import AllGenres from "./components/Pages/AllGenres/AllGenres";
import Browse from "./components/Pages/Browse/Browse";
import Favourites from "./components/Pages/MyFavourites/MyFavourites";
import Playlists from "./components/Pages/MyPlaylists/MyPlaylists";
import SavedAlbums from "./components/Pages/SavedAlbums/SavedAlbums";
import Profile from "./components/Pages/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Trending" element={<Trending />} />
      <Route path="/Topcharts" element={<TopCharts />} />
      <Route path="/NewRelease" element={<NewRelease />} />
      <Route path="/AllGenres" element={<AllGenres />} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="/Browse" element={<Browse/>} />
      <Route path="/Myfavourites" element={<Favourites/>} />
      <Route path="/MyPlaylists" element={<Playlists/>} />
      <Route path="/SavedAlbums" element={<SavedAlbums/>} />
      <Route path="/Profile" element={<Profile/>} />


    </Routes>
  );
}

export default App;