import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/Logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="NIE Mysuru logo" className="logo" />

          <div className="navbar-title">
            <h2>NIE Mysuru</h2>
            <p>Placement Portal</p>
          </div>
        </div>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/drives">Drives</NavLink>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          <NavLink to="/about">About TPO</NavLink>
          <NavLink to="/logout" > Logout</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
