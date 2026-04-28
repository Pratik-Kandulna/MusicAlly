import Navbar from "../../Navbars/Navbar";
import Hero from "../../Hero/Hero";
import Why from "../../WhySection/Why";
import Featured from "../../Featured/Featured";
import Genres from "../../Genres/Genres";
import Artists from "../../ArtistsSection/Artists";
import Stats from "../../stats/stats";

function Home() {
  return (
    
    <div>
      <Navbar />
      <Hero />
      <Why />
      <Featured />
      <Genres />
      <Artists />
      <Stats />
    </div>
  );
}

export default Home;