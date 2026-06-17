import "./Login.css";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CreateAcc() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        name,
        email,
        password,
      }
    );

    console.log(res.data);

    alert("Account created successfully!");

    navigate("/Login");

  } catch (err) {
    console.log(err);
    alert("Registration failed");
  }
};


  const navigate = useNavigate();
  const [role, setRole] = useState("user");


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
          <h3>Create Account / Login</h3>
          <p className="sub">Join the music revolution today</p>
          {/***********ROLE************/}
            <div className="Role-input-box">
              <NavLink to="/Login">
              <button style={{ border: "1px solid black", borderRadius:"5px" }}>Login</button>
              </NavLink>
            </div>

          <form onSubmit={handleRegister}>
            <div className="input-box">
              <FaUser />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-box">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-box">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="terms">
              <input type="checkbox" />
              <span>
                I agree to <b>Terms of Service</b> and <b>Privacy Policy</b>
              </span>
            </div>

            
            
              <button className="signup-btn" type="submit">
                Create Account
                </button>
            
                

          
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

export default CreateAcc;