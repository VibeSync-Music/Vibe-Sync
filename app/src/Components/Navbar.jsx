import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full">
      <Link to="/">VibesSync</Link>
      <Link to="/favorites">favorites</Link>
    </nav>
  );
};

export default Navbar;
