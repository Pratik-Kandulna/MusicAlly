import "./Login.css";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {

  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email,
        password,
        role,
      }
    );

    console.log(res.data);
    console.log("Login response:", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
    

    alert("Login successful!");

    navigate("/Dashboard");


  } catch (err) {
    console.log(err);
    alert("Login failed");
  }
};


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
          <h3>Login</h3>
          <p className="sub">Join the music revolution today</p>
          

          <form onSubmit={handleLogin}>

            {/***********ROLE************/}
            <div className="Role-input-box">
              <p>Login as:</p>
              <div style={{ display: "flex", justifyContent:"space-between" }}>
                  <input
                    type="checkbox"
                    checked={role === "user"}
                    onChange={() => setRole("user")}
                  />
                    <span>User</span>

                <input
                    type="checkbox"
                    checked={role === "admin"}
                    onChange={() => setRole("admin")}
                    style={{marginLeft:"40px",
                        border:"1px solid black"
                    }}
                  />
                    <span>Admin</span>
                    
              </div>
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

            
            <button className="signup-btn" type="submit" onClick={handleLogin}>
                     Login
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

export default Login;