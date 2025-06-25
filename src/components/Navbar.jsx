import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h1 className="bold blue">Robust</h1>
          <h1 className="normal">-Kit</h1>
        </div>

        <button className="nav-toggle" onClick={toggleMenu}>
          {menuOpen ? '✕' : (
            <>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </>
          )}
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/how" onClick={() => setMenuOpen(false)}>How</NavLink></li>
          <li><NavLink to="/results" onClick={() => setMenuOpen(false)}>Results</NavLink></li>
          <li><NavLink to="/started" onClick={() => setMenuOpen(false)} style={{display:'flex', flexDirection:'row', gap:'0.5em'}}>Get started <img
                          src="/icons/github.svg"
                          alt="GitHub icon"
                          className="overlay-icon-started"
                          style={{marginTop:'-0.2em'}}
                        /></NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
