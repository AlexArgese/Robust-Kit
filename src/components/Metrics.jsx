import React, { useState } from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './Metrics.css';

export default function Metrics() {
  const [hoveredPartRG, setHoveredPartRG] = useState(null);
  const [hoveredPartRAP, setHoveredPartRAP] = useState(null);

  return (
    <div className="metrics-wrapper">
      {/* Titolo “Metrics” fuori dalla board */}
      <h2 className="metrics-title-outside normal">Metrics</h2>

      <div className="metrics-container">
        {/* ---------- CAMBIATA QUI l’immagine a "/large board.png" ---------- */}
        <img
          src="/large board.png"
          alt="board"
          className="board-image-metric"
        />

        {/* Overlay con tutto il contenuto dentro la parte bianca interna della board */}
        <div className="overlay-content">
          {/* ————— SEZIONE RG ————— */}
          <div className="metric-section rg-section">
            <h2 className="metric-heading normal blue">RG</h2>
            <p className="metric-desc">
              A quantitative metric for Open models that evaluates performance
              retention across data shifts. It combines the Dice score variation,
              distribution divergence (KL divergence), and fairness consistency
              across subgroups to assess generalizability.
            </p>

            <div className="formula-container">
            <InlineMath
                  math={'RG_{i}='}
                />
              {/* Parte 1: μ */}
              <span
                className="formula-part"
                onMouseEnter={() => setHoveredPartRG(1)}
                onMouseLeave={() => setHoveredPartRG(null)}
              >
                <InlineMath math={'\\mu'} />
              </span>
              <span className="formula-op">·</span>

              {/* Parte 2: (1 − |ΔDSCᵢ/DSCₜᵣₐᵢₙ|) */}
              <span
                className="formula-part"
                onMouseEnter={() => setHoveredPartRG(2)}
                onMouseLeave={() => setHoveredPartRG(null)}
              >
                <InlineMath
                  math={
                    '\\Bigl(1 - \\bigl| \\frac{\\Delta DSC_{i}}{DSC_{train}} \\bigr| \\Bigr)'
                  }
                />
              </span>
              <span className="formula-op">·</span>

              {/* Parte 3: 1 / [1 + KL(Dₜᵣₐᵢₙ ∥ Dᵢ)] */}
              <span
                className="formula-part"
                onMouseEnter={() => setHoveredPartRG(3)}
                onMouseLeave={() => setHoveredPartRG(null)}
              >
                <InlineMath
                  math={'\\dfrac{1}{1 + \\mathrm{KL}(D_{train} \\parallel D_{i})}'}
                />
              </span>
              <span className="formula-op">·</span>

              {/* Parte 4: (1 − σ_{DSC}/DSC_{train}) */}
              <span
                className="formula-part"
                onMouseEnter={() => setHoveredPartRG(4)}
                onMouseLeave={() => setHoveredPartRG(null)}
              >
                <InlineMath
                  math={'\\Bigl(1 - \\frac{\\sigma_{\\mathrm{DSC}}}{DSC_{train}} \\Bigr)'}
                />
              </span>

              {/* — Tooltip RG — */}
              {hoveredPartRG === 1 && (
                <div className="tooltip tooltip-rg tooltip-1">
                  Scales the metric overall by μ as a normalization constant.
                </div>
              )}
              {hoveredPartRG === 2 && (
                <div className="tooltip tooltip-rg tooltip-2">
                  Penalizes large drops in Dice score relative to training.
                </div>
              )}
              {hoveredPartRG === 3 && (
                <div className="tooltip tooltip-rg tooltip-3">
                  Penalizes distribution shift via KL divergence between train and test.
                </div>
              )}
              {hoveredPartRG === 4 && (
                <div className="tooltip tooltip-rg tooltip-4">
                  Penalizes high variance (σ<sub>DSC</sub>) in DSC across subgroups.
                </div>
              )}
            </div>
          </div>

          {/* ————— SEZIONE RAP ————— */}
          <div className="metric-section rap-section">
            <h2 className="metric-heading normal blue">RAP</h2>
            <p className="metric-desc">
              A metric for Closed models that measures performance consistency
              across test subsets. It penalizes high variance in Dice scores,
              promoting equitable and stable model behavior under diverse
              clinical conditions.
            </p>

            <div className="formula-container">
              {/* Parte 1: λ · ( ∑ Wᵢ · DSC_{test,i} / ∑ Wᵢ ) */}
              <InlineMath
                  math={'RAP='}
                />
              <span
                className="formula-part"
                onMouseEnter={() => setHoveredPartRAP(1)}
                onMouseLeave={() => setHoveredPartRAP(null)}
              >
                <InlineMath
                  math={'\\lambda \\cdot \\Bigl( \\dfrac{\\sum W_{i}\\,·\, DSC_{test,i}}{\\sum W_{i}}'}
                />
              </span>
              <span className="formula-space"></span>

              {/* Parte 2: −√[ (∑ Wᵢ·(DSC_{test,i} − \overline{DSC})²) / ∑ Wᵢ ] */}
              <span
                className="formula-part"
                onMouseEnter={() => setHoveredPartRAP(2)}
                onMouseLeave={() => setHoveredPartRAP(null)}
              >
                <InlineMath
                  math={'- \\sqrt{ \\dfrac{\\sum W_{i}\\,·\\,\\bigl( DSC_{test,i} - \\overline{DSC} \\bigr)^{2}}{\\sum W_{i}} }\\Bigr)'}
                />
              </span>

              {/* — Tooltip RAP — */}
              {hoveredPartRAP === 1 && (
                <div className="tooltip tooltip-rap tooltip-1">
                  Weighted mean DSC across test subsets.
                </div>
              )}
              {hoveredPartRAP === 2 && (
                <div className="tooltip tooltip-rap tooltip-2">
                  Subtracts the weighted standard deviation of DSC to penalize variance.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
