import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand-logo">
        <img src="/logo-icon.svg" alt="VibeSync icon" className="logo-icon" />
        <h1 className="gradient-logo">VibeSync</h1>
      </div>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
