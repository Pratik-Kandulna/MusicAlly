import { NavLink } from "react-router-dom";
import "./Login.css";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";

function Login() {
  return (
    <div className="signup-page">

      <div className="signup-container">

        {/* LEFT SIDE */}
        <div className="signup-left">
          <h1 className="logo">🎵 MusicAlly</h1>

          <h2>Start Your Musical Journey</h2>
          <p>Create an account and unlock a world of music</p>

          <img src="/images/studio.jpg" alt="music" className="hero-img" />

          <div className="features">
            <div className="feature">
              <span>✔</span>
                <div className="feature-text">
                  <h4>Unlimited Streaming</h4>
                  <p>Access millions of songs</p>
                </div>
              </div>

            <div className="feature">
              <span>✔</span>
              <div className="feature-text">
                <h4>Personalized Playlists</h4>
                <p>AI-powered recommendations</p>
              </div>
            </div>

            <div className="feature">
              <span>✔</span>
              <div className="feature-text">
                <h4>Community Features</h4>
                <p>Connect with music lovers</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="signup-card">
          <h3>Create Account</h3>
          <p className="sub">Join the music revolution today</p>

          <form>
            <div className="input-box">
              <FaUser />
              <input type="text" placeholder="Full Name" />
            </div>

            <div className="input-box">
              <FaEnvelope />
              <input type="email" placeholder="Email" />
            </div>

            <div className="input-box">
              <FaLock />
              <input type="password" placeholder="Password" />
            </div>

            <div className="terms">
              <input type="checkbox" />
              <span>
                I agree to <b>Terms of Service</b> and <b>Privacy Policy</b>
              </span>
            </div>
          <NavLink to="/Dashboard">
            <button className="signup-btn">Create Account</button>
            </NavLink>
          </form>

          <div className="divider">Or sign up with</div>

          <div className="socials">
            <FaGoogle />
            <FaFacebookF />
            <FaTwitter />
          </div>

          <p className="login-link">
            Already have an account? <span>Sign in</span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;