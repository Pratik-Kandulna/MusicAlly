import "./hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Discover the Rhythm of Life</h1>
        <p>Explore thousands of curated music collections</p>

        <div className="hero-btns">
          <button className="secondary">Explore</button>
          <button className="secondary">Learn More</button>
        </div>
      </div>
      <div className="MusicGirl">
      <div className="hero-right">
        <img src="/images/musicgirl.png" alt="" />
      </div>
      </div>
    </section>
  );
}

export default Hero;