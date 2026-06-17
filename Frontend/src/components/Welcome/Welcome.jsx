import ".././Pages/Home/dashboard.css";
import "./Welcome.css";

function Welcome() {

  const user = JSON.parse(localStorage.getItem("user"));


  return (
    <div className="welcome">
      <div className="welcome-content">

        {/* LEFT TEXT */}
        <div className="welcome-left">
          <h1>
            Welcome back, {user?.name}! 👋
          </h1>
          <p>Ready to discover new music today?</p>
        </div>

        {/* RIGHT STATS */}
        <div className="stats">
          <div className="stat-box">
            <h2>2,847</h2>
            <p>Songs Played</p>
          </div>

          <div className="stat-box">
            <h2>124</h2>
            <p>Hours Listened</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Welcome;