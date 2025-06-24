import React, { useState, useEffect, useRef } from 'react';
import './How.css';
import StepDatasets from './StepDatasets';
import Metrics from './Metrics';

function How() {
  const boardRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const sc = window.scrollY;
      boardRef.current?.querySelectorAll('.parallax-layer').forEach(layer => {
        const d = parseFloat(layer.dataset.depth);
        layer.style.transform = `translateZ(${d * 100}px) translateY(-${sc * d}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTypesShift = (e) => {
    e.preventDefault();
    const targetEl = document.getElementById('TypesShift');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="how-page">
        <section className="how-hero">
          <div className="line1">
            <div className="how-logo">
              <h1 className="bold blue">Robust</h1>
              <h1 className="normal">-Kit in</h1>
            </div>
            <h1 className="normal blue">3</h1>
            <h1 className="normal"> step</h1>
          </div>
          <h2 className="normal">Don’t trust performance until it’s tested outside the box.</h2>
        </section>

        <section className="step1">
          <div className="line1">
            <h1 className="normal">Step 1</h1>
            <h2 className="normal">-</h2>
            <h2 className="normal blue">Dataset Construction</h2>
          </div>
          <div className="principal-content">
            <div className="step1-text">
              <p>
                Robust-Kit begins by analyzing the dataset you provide, along with the type of distribution shift you want to evaluate — such as acquisition, population, prevalence, or concept shift. You also specify which sensitive attributes (like age, sex, scanner, or center) define that shift. These attributes are crucial for detecting how and where model performance varies.
              </p>
              <p>
                For each unique value of a sensitive attribute, the framework creates a corresponding subset of data (e.g., “male” vs “female” or “Siemens” vs “GE”), while keeping all other attributes balanced across groups. This is essential to ensure the robustness evaluation focuses only on the shift of interest, without confounding effects.
              </p>
              <p>
                To guarantee fair and meaningful comparisons, Robust-Kit uses stratified sampling. This method ensures that every subgroup is represented proportionally and consistently, allowing you to accurately assess how your model behaves across real-world clinical differences.
              </p>
              <a
                href="#"
                className="link"
                onClick={scrollToTypesShift}
              >
                Discover details on shifts
              </a>
            </div>

            <div className="board-image" ref={boardRef}>
              <img className="board" src="/step1/board.png" alt="Board frame" />

              <div className="board-parallax">
                <div className="parallax-layer layer1" data-depth="0.1">
                  <img src="/step1/acquisition.png" alt="Acquisition shift" />
                </div>
                <div className="parallax-layer layer2" data-depth="0.15">
                  <img src="/step1/population.png" alt="Population shift" />
                </div>
                <div className="parallax-layer layer3" data-depth="0.2">
                  <img src="/step1/prevalence.png" alt="Prevalence shift" />
                </div>
                <div className="parallax-layer layer4" data-depth="0.25">
                  <img src="/step1/concept.png" alt="Concept shift" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="step2">
          <div className="line1 bot">
            <h1 className="normal">Step 2</h1>
            <h2 className="normal">-</h2>
            <h2 className="normal blue">Model Categorization</h2>
          </div>

          <div className="step2-visual">
            <svg
              className="step2-arrow-static arrow-left margine-frecce"
              viewBox="0 0 200 100"
              preserveAspectRatio="none"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L6,3 L0,6 Z" fill="#4D8AFF" />
                </marker>
              </defs>
              <path
                d="M100,20 L50,70"
                stroke="#4D8AFF"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
            </svg>

            <svg
              className="step2-arrow-static arrow-right margine-frecce"
              viewBox="0 0 200 100"
              preserveAspectRatio="none"
            >
              <defs>
                <marker
                  id="arrowhead2"
                  markerWidth="6"
                  markerHeight="6"
                  refX="2"
                  refY="3"
                  orient="225"
                >
                  <path d="M6,0 L0,3 L6,6 Z" fill="#4D8AFF" />
                </marker>
              </defs>
              <path
                d="M100,20 L150,70"
                stroke="#4D8AFF"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead2)"
              />
            </svg>

            <div className="step2-layer step2-left margine">
              <img src="/step2/open model.png" alt="Open model" />
              <p className="step2-label"><span className="blue">Open</span> model</p>
            </div>
            <div className="step2-layer step2-center">
              <img src="/step2/MODELA AI.png" alt="AI model" />
            </div>
            <div className="step2-layer step2-right margine">
              <img src="/step2/closed model.png" alt="Closed model" />
              <p className="step2-label"><span className="blue">Closed</span> model</p>
            </div>
          </div>

          <div className="step2-texts">
            <div className="step2-text">
              Open models are those for which the training data is known and accessible. This allows Robust-Kit to perform a detailed robustness analysis by comparing model performance on shifted data against its performance on the original training distribution. For open models, the framework calculates the Robustness Grade (RG) — a composite score that accounts for performance drop, statistical shift (via KL divergence), and subgroup consistency. This makes it possible to measure not only whether a model performs well, but also whether it generalizes fairly across clinical shifts.
            </div>
            <div className="step2-text right">
              Closed models are treated as black boxes — you don’t know what they were trained on, or you don’t have access to their training data. These include commercial models, foundation models, or APIs. In this case, Robust-Kit cannot compare against a training baseline, so it uses a different metric: the Robustness-Aware Performance (RAP) score. RAP rewards models that maintain high and consistent performance across all subgroups, and penalizes those that behave unpredictably or unfairly. This makes RAP ideal for evaluating foundation models in real-world settings.
            </div>
          </div>
        </section>
      </div>

      <Step3 />

      <section className="details">
        <div className="details-content">
          <h2 className="details-title blue">Details</h2>
          <h3 id="TypesShift" className="normal">Types of Shift</h3>
          <StepDetails />
        </div>
        <StepDatasets />
        <Metrics />
      </section>

      <div className="view-results-section">
        <div className="view-results-content">
          <h2 className="view-results-title">
            Want to know if your model is <span className="bold blue">Robust</span>?
          </h2>
          <a href="/results">
            <img className="view-results-img" src="/view-results.png" alt="view-results" />
          </a>
        </div>
      </div>
    </>
  );
}

export default How;

function Step3() {
  const [rawPct, setRawPct] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          const sec = document.querySelector('.step3');
          if (sec) {
            const { top, height } = sec.getBoundingClientRect();
            const winH = window.innerHeight;
            let p = ((winH - top) / winH) * 35;
            p = Math.max(0, Math.min(100, p));
            setRawPct(p);
          }
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const resultRaw = 28;
  let fillPct;
  if (rawPct <= 15)            fillPct = rawPct;
  else if (rawPct <= 16)       fillPct = 15 + (rawPct - 15) * 30;
  else if (rawPct <= 31)       fillPct = 50 + (rawPct - 16) * 1;
  else if (rawPct <= 32)       fillPct = 60 + (rawPct - 31) * 40;
  else                          fillPct = 100;
  const emptyPct = 100 - fillPct;

  let radius;
  if (rawPct <= 15)            radius = 0.5;
  else if (rawPct <= 16)       radius = 0.5 - (rawPct - 15);
  else                          radius = 0.2;

  let heightStyle;
  if (rawPct <= 15)            heightStyle = '3rem';
  else if (rawPct <= 16) {
    const t = rawPct - 15;
    heightStyle = `calc(3rem + ${t} * (20em - 3rem))`;
  } else if (rawPct <= 31)     heightStyle = '20em';
  else if (rawPct <= 32) {
    const t = rawPct - 31;
    heightStyle = `calc(20em + ${t} * (10em - 20em))`;
  } else                        heightStyle = '15em';

  return (
    <div className="how-page2">
      <section className="step3">
        <div className="line1">
          <h1 className="normal">Step 3</h1>
          <h2 className="normal">–</h2>
          <h2 className="normal blue">
            Robustness and Performance Analysis
          </h2>
        </div>
        <h3 className="normal">
          It is not just about Accuracy. It is a matter of stability and robustness.
        </h3>

        <div
          className="progress-slider"
          style={{ height: heightStyle }}
        >
          <div className="progress-empty">
            <div
              className="empty-bg"
              style={{
                transform: `scaleX(${emptyPct / 100})`,
                borderRadius: `0 ${radius}rem ${radius}rem 0`,
              }}
            />
            {fillPct >= 50 && fillPct < 100 && (
              <div className="metric-content empty-content">
                <h2 className='normal'>RAP metric</h2>
                <p><strong>For whom?</strong><br />Closed Models</p>
                <p><strong>What does it use?</strong><br />Dice Mean Score & variation</p>
                <p><strong>What does it say?</strong><br />How stable the model is</p>
              </div>
            )}
          </div>

          <div className="progress-fill">
            <div
              className="fill-bg"
              style={{
                transform: `scaleX(${fillPct / 100})`,
                borderRadius: `${radius}rem 0 0 ${radius}rem`,
              }}
            />
            {fillPct < 20 && (
              <div className="progress-label">
                Dice score – <span>{Math.round(rawPct)}%</span>
              </div>
            )}
            {fillPct >= 50 && fillPct < 100 && (
              <div className="metric-content fill-content">
                <h2 className='normal'>RG metric</h2>
                <p><strong>For whom?</strong><br />Open Models</p>
                <p><strong>What does it use?</strong><br />Dice Score & differences</p>
                <p><strong>What does it say?</strong><br />How much does it hold up outside the domain</p>
              </div>
            )}
            {fillPct === 100 && (
              <div className="result-content">
                <h2>The Result</h2>
                <p className="result-sub">
                  A score between 0 and 5: where 0 indicates low robustness and 5 high robustness
                </p>
                <div className="stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


const stones = [
  {
    id: 0,
    label: 'Acquisition',
    frontText: `Performance may change when data is acquired using different scanners, protocols, or imaging settings. Even if the anatomy and task stay the same, models can behave very differently across vendors or clinical sites.`,
    src: '/stone.png',
    backImage: '/monitors.png',
  },
  {
    id: 1,
    label: 'Population',
    frontText: `When the patient demographics change — such as age, sex, or ethnicity — model performance may become uneven. Robust-Kit tests how well your model adapts across these groups without bias or degradation.`,
    src: '/stone.png',
    backImage: '/population.png',
  },
  {
    id: 2,
    label: 'Prevalence',
    frontText: `Some pathologies or anatomical conditions may be more or less frequent in the test data. Robust-Kit evaluates whether your model stays reliable even when the class distribution changes significantly.`,
    src: '/stone.png',
    backImage: '/prevalence.png',
  },
  {
    id: 3,
    label: 'Concept',
    frontText: `This occurs when the definition of the task itself changes — for example, due to different annotation styles or clinical guidelines. Robust-Kit detects if the model still performs well when the segmentation concept varies subtly.`,
    src: '/stone.png',
    backImage: '/concept.png',
  },
];

function StepDetails() {
  const [flipped, setFlipped] = useState(stones.map(() => false));

  const toggleFlip = (i) => {
    setFlipped((f) => {
      const copy = [...f];
      copy[i] = !copy[i];
      return copy;
    });
  };

  return (
    <div className="stones">
      {stones.map((stone, idx) => (
        <div key={stone.id} className="stone-card">
          <div
            className={`card-inner ${flipped[idx] ? 'is-flipped' : ''}`}
            onClick={() => toggleFlip(idx)}
          >
            <div
              className="card-face card-front"
              style={{ backgroundImage: `url(${stone.src})` }}
            >
              <h4 className="stone-label normal blue">{stone.label}</h4>
              <div className="front-text">
                {stone.frontText.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div
              className="card-face card-back"
              style={{ backgroundImage: `url(${stone.src})` }}
            >
              <h4 className="stone-label normal blue">{stone.label}</h4>
              <img
                className="back-overlay"
                src={stone.backImage}
                alt={`${stone.label} detail`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}