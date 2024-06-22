import { useEffect, useState } from "react";

import logo from "../pics/logo.png";
import "./Header.css";
import { NavLink } from "react-router-dom";

function Header() {
  const [navOpac, setNavOpac] = useState(1);

  // DYNAMIC NAVBAR OPACITY
  useEffect(() => {
    window.onscroll = () => {
      var opac = (100 - window.scrollY / 20) / 100;
      if (opac < 0.85) setNavOpac(0.85);
      else setNavOpac(opac);
    };
  });

  return (
    <nav
      className={`navbar navbar-expand-md shadow py-0 px-sm-4`}
      style={{ opacity: navOpac }}
    >
      <div className="container">
        <img src={logo} alt="Logo SuitMedia" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav m-0">
            <li className="nav-item">
              <NavLink to="/work">Work</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/services">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/">Ideas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/careers">Careers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
