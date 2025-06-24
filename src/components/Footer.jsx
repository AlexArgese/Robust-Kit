// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container1">
        <div className="logo">
          <h1 className="bold blue">Robust</h1>
          <h1 className="normal">-Kit</h1>
        </div>
        Copyright © 2025 | EURECOM | All rights reserved.
      </div>
      <div className="footer-container2">
        <div className='line-footer'>
          <img src="/Al4Health.png" alt="Al4Health@EURECOM"/>
          <span className='partOf'>part of Al4Health@EURECOM</span> 
        </div>
        <div className='line-footer'>
          <img src="/logo_alex.png" alt="Al4Health@EURECOM"/>
          <span className='partOf'>Website, graphics & animations by <strong>
            <a target="_blank"
            rel="noopener noreferrer"
            style={{color:'#4D8AFF', borderBottom: '1px solid #4D8AFF',}}
            href='https://alexargese.github.io'>Alex Argese
            </a>
          </strong></span> 
        </div>
      </div>
      <p className='footer-note'>Some images on this website are AI-generated.</p>
    </footer>
  );
}