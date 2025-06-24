import React from 'react';
import './Board.css';

export function ScannerDetails({
  scanner,
  patientGroup,
  hospital,
  labelingStandard
}) {
  return (
    <div className="scanner-details">
      <p><strong>Scanner:</strong> {scanner}</p>
      <p><strong>Patient group:</strong> {patientGroup}</p>
      <p><strong>Hospital:</strong> {hospital}</p>
      <p><strong>Labeling standard:</strong> {labelingStandard}</p>
    </div>
  );
}
