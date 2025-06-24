import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StepDatasets.css';

const DATASETS = [
    {
      id: 'brats',
      label: 'BRATS Africa',
      description:
        'BRATS Africa is a brain tumor segmentation dataset from African populations.\nUsed to study population shift, particularly ethnicity-related variability.',
    },
    {
      id: 'mnms2',
      label: 'MnMs2',
      description:
        'MnMs2 is a cardiac MRI dataset with multiple centers and vendors:\nused to evaluate acquisition and population shifts (e.g., age, sex, scanner, center).',
    },
    {
      id: 'oasis2',
      label: 'OASIS2',
      description:
        'OASIS-2 is a longitudinal brain MRI dataset:\nused to study population, prevalence, and concept shifts (e.g., aging, temporal variation).',
    },
    {
      id: 'totalseg',
      label: 'TOTALSEG',
      description:
        'TOTALSEG includes full-body multi-organ annotations from MRI and CT:\nused to analyze acquisition and population shifts across manufacturers and institutions.',
    },
    {
      id: 'amos',
      label: 'AMOS',
      description:
        'AMOS is a multi-organ abdominal CT segmentation benchmark:\nused to assess acquisition and population shifts (e.g., vendor, sex, age).',
    },
  ];
  

// Dimensioni small/large
const SMALL_SIZE = 150;
const LARGE_SIZE = 400;

// Centro fisso per i cerchi
const CENTER = { x: 300, y: 200 };
// Angoli (in gradi) dove posizioniamo i 5 cerchi
const ANGLES = [90, 20, -50, -130, 160];

export default function StepDatasets() {
  const [selectedId, setSelectedId] = useState(null);

  // stato dinamico del raggio, parte da 50 e, quando entra in viewport, passa a 200
  const [radius, setRadius] = useState(50);
  const containerRef = useRef(null);

  // IntersectionObserver per aggiornare `radius` a 200 quando <div> entra nel viewport, altrimenti torna a 50
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRadius(200);
        } else {
          setRadius(50);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -30% 0px',
        threshold: 0,
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Funzione per calcolare le coordinate del centro di ogni cerchio (in base a `radius`)
  const getCoords = (i) => {
    const rad = (ANGLES[i] * Math.PI) / 180;
    return {
      x: CENTER.x + radius * Math.cos(rad),
      y: CENTER.y - radius * Math.sin(rad),
    };
  };

  return (
    <div className="step-datasets-container">
      <h2 className="datasets-title normal">
        Here’s how real datasets map to measurable shifts
      </h2>

      {/* Div che osserviamo con IntersectionObserver */}
      <div className="datasets-area" ref={containerRef}>
      <svg className="dataset-arrows">
      {DATASETS.map((_, i) => {
        const { x, y } = getCoords(i);

        // Calcola direzione unit vector per accorciare
        const dx = x - CENTER.x;
        const dy = y - CENTER.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const shorten = 80

        const x2 = x - (dx / length) * shorten;
        const y2 = y - (dy / length) * shorten;

        return (
            <line
            key={i}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={x2}
            y2={y2}
            stroke="#4D8AFF"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            />
        );
        })}
        <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#4D8AFF" />
            </marker>
        </defs>
        </svg>
      <div className="center-oval">
            Dataset
        </div>
        {DATASETS.map((ds, i) => {
          const { x, y } = getCoords(i);
          const isSelected = selectedId === ds.id;

          // Se è piccolo, mostra etichetta sotto; se selezionato, mostra descrizione dentro.
          return (
            <motion.div
              key={ds.id}
              className="dataset-circle"
              // Impostiamo le proprietà iniziali e animate in base allo stato `isSelected`
              style={{
                // left/top in px del bordo superiore-sinistro del div
                left: isSelected
                  ? CENTER.x - LARGE_SIZE / 2
                  : x - SMALL_SIZE / 2,
                top: isSelected
                  ? CENTER.y - LARGE_SIZE / 2
                  : y - SMALL_SIZE / 2,
                width: isSelected ? LARGE_SIZE : SMALL_SIZE,
                height: isSelected ? LARGE_SIZE : SMALL_SIZE,
                zIndex: isSelected ? 10 : 1,
                filter:
                    selectedId !== null && ds.id !== selectedId
                    ? 'blur(4px)'
                    : 'none',
              }}
              animate={{
                // animiamo width/height contemporaneamente, lasciando animate coord e dimensione
                left: isSelected
                  ? CENTER.x - LARGE_SIZE / 2
                  : x - SMALL_SIZE / 2,
                top: isSelected
                  ? CENTER.y - LARGE_SIZE / 2
                  : y - SMALL_SIZE / 2,
                width: isSelected ? LARGE_SIZE : SMALL_SIZE,
                height: isSelected ? LARGE_SIZE : SMALL_SIZE,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={() =>
                setSelectedId((prev) => (prev === ds.id ? null : ds.id))
              }
            >
              <div className="circle-shape" />

              {/* Se non selezionato, mostriamo solo l’etichetta sotto */}
              {!isSelected && (
                <div className="circle-label-small">{ds.label}</div>
              )}

              {/* Se selezionato, mostriamo il contenuto all’interno */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    key="content"
                    className="circle-content-expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {ds.description.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
