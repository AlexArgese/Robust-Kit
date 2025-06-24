import React, { useState, useRef, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Results.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

import summaryTable from "../data/summaryTable.json";
import detailData   from "../data/detailData.json";

export default function Results() {
  /* -------------------------------------------------- state & refs ----- */
  const detailRef = useRef(null);
  const [selectedDetail,   setSelectedDetail]   = useState(null);
  const [selectedDatasets, setSelectedDatasets] = useState({});

  /* -------------------------------------------------- group rows -------- */
  const groups = useMemo(() => {
    const map = {};
    summaryTable.forEach(row => {
      const m = row.model.match(/^(.+?) \((.+)\)$/);
      const base    = m ? m[1] : row.model;
      const dataset = m ? m[2] : "";
      if (!map[base]) map[base] = { base, options: [] };
      map[base].options.push({
        dataset,
        values: row.values,
        key   : row.values.map(v => v.key)
      });
    });
    return Object.values(map);
  }, []);

  /* init dataset select */
  useEffect(() => {
    const init = {};
    groups.forEach(g => (init[g.base] = 0));
    setSelectedDatasets(init);
  }, [groups]);

  const handleDatasetChange = (base, idx) => {
    setSelectedDatasets(prev => ({ ...prev, [base]: idx }));
    setSelectedDetail(null);
  };

  const handleCellClick = (groupIdx, colIdx) =>
    setSelectedDetail({ groupIdx, colIdx });

  /* scroll to detail */
  useEffect(() => {
    if (selectedDetail && detailRef.current) {
      requestAnimationFrame(() =>
        detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  }, [selectedDetail]);

  /* -------------------------------------------------- active detail ----- */
  const activeDetail = useMemo(() => {
    if (!selectedDetail) return null;
    const { groupIdx, colIdx } = selectedDetail;
    const group  = groups[groupIdx];
    const dsIdx  = selectedDatasets[group.base];
    const cell   = group.options[dsIdx].values[colIdx];
    const extra  = detailData[cell.key] || {};
    return {
      title      : `${group.base} (${group.options[dsIdx].dataset}) – ${cell.shift} shift`,
      labels     : extra.labels,
      scores     : extra.scores,
      label      : cell.label,
      score      : cell.score,
      description: extra.description || `The bar chart shows performance across groups. The ${cell.label} score is summarised below.`
    };
  }, [selectedDetail, selectedDatasets, groups]);

  const barPalette = ["#4d88ff","#769cff","#9fb1ff","#c8c5ff","#b1ff9c","#8aff72","#63ff48"];

  /* ================================================== render ============ */
  return (
    <div className="res-page">
      <div className="results">
        {/* ---------- HERO ------------------------------------------------- */}
        <section className="how-hero hero-pad">
          <div className="line1">
            <div className="how-logo">
              <h1 className="bold blue">Robust</h1>
              <h1 className="normal">-Kit&nbsp;</h1>
            </div>
            <h1 className="normal">Results</h1>
          </div>
          <h3 className="normal" style={{ margin: "0 20%" }}>
            We tested several medical segmentation models under population,
            acquisition, prevalence and concept shifts.
          </h3>
          <h3 className="normal">Here’s how they held up.</h3>
        </section>

        {/* ---------- TABLE ---------------------------------------------- */}
        <div className="results-table-wrapper">
          <div className="results-frame">
            <span className="vline-1" /><span className="vline-2" />
            <span className="vline-3" /><span className="vline-4" />
            <div className="shifts-title normal blue">Shifts</div>

            <table className="results-table">
              <thead>
                <tr>
                  <th className="thHead normal blue">Models</th>
                  <th>Acquisition</th><th>Population</th>
                  <th>Prevalence</th><th>Concept</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group,gIdx)=>{
                  const dsIdx = selectedDatasets[group.base] || 0;
                  const row   = group.options[dsIdx].values;
                  return(
                    <tr key={group.base}>
                      <td className="model-name">
                        {group.base}
                        <select
                          className="dataset-select"
                          value={dsIdx}
                          onChange={e=>handleDatasetChange(group.base,+e.target.value)}
                        >
                          {group.options.map((opt,i)=>(
                            <option key={i} value={i}>{opt.dataset}</option>
                          ))}
                        </select>
                      </td>

                      {row.map((cell,cIdx)=>(
                        <td
                          key={cIdx}
                          className={`cell-value ${cell.score!=='-'?'clickable':''}`}
                          onClick={()=> cell.score!=='-' && handleCellClick(gIdx,cIdx)}
                        >
                          {cell.label && <div className="cell-label">{cell.label}</div>}
                          <div className={cell.score!=='-'?'cell-score green':'cell-score'}>
                            {cell.score}
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- DETAIL --------------------------------------------- */}
        {activeDetail && (
          <section className="back-detalis">
            <div className="problem-content">
              <section ref={detailRef} className="detail-section fade-in">
                <h2 className="detail-title">{activeDetail.title}</h2>

                {activeDetail.labels && (
                  <div className="chart-wrapper">
                    <Bar
                      data={{
                        labels: activeDetail.labels,
                        datasets:[{data:activeDetail.scores,
                                   backgroundColor:activeDetail.labels.map((_,i)=>barPalette[i%barPalette.length])}]
                      }}
                      options={{
                        responsive:true, maintainAspectRatio:false,
                        plugins:{ legend:{display:false}, tooltip:{enabled:true}},
                        scales:{ y:{beginAtZero:true,max:1,ticks:{stepSize:0.2}},
                                 x:{grid:{display:false}} }
                      }}
                    />
                  </div>
                )}

                <p className="detail-copy">{activeDetail.description}</p>
                <StarRating value={activeDetail.score} metric={activeDetail.label}/>
              </section>
            </div>
          </section>
        )}

        {/* ---------- CTA finale ---------------------------------------- */}
        <div className="view-results-section">
          <div className="view-results-content">
            <h2 className="view-results-title">
              Want to <span className="bold blue">test</span> your own model?
            </h2>
            <a href="/started">
              <img className="view-results-img" src="/get_started.png" alt="view-results" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------- StarRating ---------------------------------------- */
function StarRating({ value, metric }) {
  const safe = Math.max(0, Math.min(5, value));
  const pct  = (safe / 5) * 100;
  return (
    <div className="star-wrapper" aria-label={`${metric} score: ${safe}/5`}>
      <div className="stars-outer">
        {[...Array(5)].map((_,i)=><span key={i} className="star">★</span>)}
        <div className="stars-inner" style={{ width:`${pct}%` }}>
          {[...Array(5)].map((_,i)=><span key={i} className="star">★</span>)}
        </div>
      </div>
      <span className="numeric">{metric} Score: {safe.toFixed(1)} / 5</span>
    </div>
  );
}
