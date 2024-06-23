import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="dashboard/home" className="navbarlink">
        <h1>Dashboard</h1>
      </Link>
    </div>
  );
};

export default Navbar;
