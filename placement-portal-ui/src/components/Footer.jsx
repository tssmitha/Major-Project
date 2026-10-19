import { Mail, MapPin, Phone, Clock } from "lucide-react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>NIE Placement Portal</h2>
          <p>
            Training & Placement Office <br />
            The National Institute of Engineering
          </p>
        </div>

        <div className="footer-column">
          <h3>Placement Resources</h3>
          <a href="#">Placement Materials</a>
          <a href="#">Resume Templates</a>
          <a href="#">Interview Preparation</a>
          <a href="#">Aptitude Practice</a>
        </div>

        <div className="footer-column">
          <h3>Guidelines</h3>
          <a href="#">Eligibility Criteria</a>
          <a href="#">Rules & Regulations</a>
          <a href="#">Placement Calendar</a>
          <a href="#">FAQs</a>
        </div>

        <div className="footer-column">
          <h3>Contact T&amp;P Office</h3>

          <p className="footer-contact">
            <MapPin size={16} />
            NIE Campus, Mysuru
          </p>

          <p className="footer-contact">
            <Mail size={16} />
            placement@nie.ac.in
          </p>

          <p className="footer-contact">
            <Phone size={16} />
            +91-987654321
          </p>

          <p className="footer-contact">
            <Clock size={16} />
            Mon–Fri, 9:00 AM – 5:00 PM
          </p>
        </div>

        <div className="footer-column">
          <h3>Portal</h3>
          <a href="#">Report an Issue</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <span className="version">Version 1.0</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 NIE Placement Portal</p>
        <p>Designed &amp; Developed by Training &amp; Placement Office</p>
      </div>
    </footer>
  );
}

export default Footer;