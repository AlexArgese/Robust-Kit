import React from 'react';
import './Board.css';

export function ScannerImage({ src, alt = 'CT scan' }) {
  return (
    <div className="scanner-image">
      <img src={src} alt={alt} />
    </div>
  );
}
