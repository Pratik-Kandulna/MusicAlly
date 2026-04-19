import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Login from "./components/Pages/Login/Login";
import Trending from "./components/Pages/Trending/Trending";
import TopCharts from "./components/Pages/TopCharts/TopCharts";
import NewRelease from "./components/Pages/NewRelease/NewRelease";
import Dashboard from "./components/Pages/Home/Dashboard";
import AllGenres from "./components/Pages/AllGenres/AllGenres";
import Browse from "./components/Pages/Browse/Browse";

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

    </Routes>
  );
}

export default App;