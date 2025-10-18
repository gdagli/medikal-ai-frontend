import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <NavLink to="/" className="logo">Medikal AI </NavLink>
        <ul className="nav-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Ana Sayfa</NavLink></li>
          <li><NavLink to="/projeler" className={({ isActive }) => isActive ? "active" : ""}>Projelerimiz</NavLink></li>
          <li><NavLink to="/analiz" className={({ isActive }) => isActive ? "active" : ""}>Analiz</NavLink></li>
          <li><NavLink to="/iletisim" className={({ isActive }) => isActive ? "active" : ""}>İletişim</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;