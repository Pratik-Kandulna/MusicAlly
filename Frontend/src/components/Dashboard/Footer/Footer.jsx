import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <h2 className="footer-logo">🎵 MusicAlly</h2>

          <p>
            Your ultimate destination for discovering and enjoying
            music from around the world.
          </p>

          <div className="socials">
            <div className="social"><FaFacebookF /></div>
            <div className="social"><FaTwitter /></div>
            <div className="social"><FaInstagram /></div>
            <div className="social"><FaYoutube /></div>
          </div>
        </div>

        {/* DISCOVER */}
        <div className="footer-col">
          <h3>Discover</h3>
          <ul>
            <li>New Releases</li>
            <li>Top Charts</li>
            <li>Genres</li>
            <li>Trending</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

      </div>

      {/* LINE */}
      <div className="footer-line"></div>

      {/* BOTTOM */}
      <p className="footer-bottom">
        © 2026 MusicAlly. All rights reserved. Made with ❤️ for music lovers everywhere.
      </p>

    </footer>
  );
}

export default Footer;