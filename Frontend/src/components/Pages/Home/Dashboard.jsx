import SNavbar from "../../DashNavBar/sNavbar";
import Navbar from "../../Navbars/Navbar";
import Welcome from "../../Welcome/Welcome";
import QuickCards from "../../QuickCards/QuickCards";
import RecentlyPlayed from "../../RecentlyPlayed/RecentlyPlayed";
import Playlists from "../../Dashboard/Playlists/Playlists";
import JumpBack from "../../Dashboard/JumpBack/JumpBack";
import Recommended from "../../Recommended/Recommended";
import Footer from "../../Dashboard/Footer/Footer";
import "./dashboard.css";

function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
      <SNavbar/>
      <Welcome />
      <QuickCards />
      <RecentlyPlayed />
      <Playlists />
      <JumpBack />
      <Recommended/>
      <Footer/>

      </div>
    </>
  );
}

export default Dashboard;