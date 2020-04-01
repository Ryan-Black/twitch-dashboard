import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar justify-content-around mb-2">
      <div>
        <NavLink className="title-link" to="">
          <h4 className="text-purple pt-3">TwitchDashboard</h4>
        </NavLink>
      </div>
      <div className="d-flex justify-content-end">
        <li className="nav-item nav-link">
          <NavLink className="link" to="">
            Games
          </NavLink>
        </li>
        <li className="nav-item nav-link">
          <NavLink className="link" to="/top-streams">
            Streams
          </NavLink>
        </li>
        <li className="nav-item nav-link">
          <NavLink className="link" to="/search">
            Search
          </NavLink>
        </li>
      </div>
    </nav>
  );
}

export default Header;
