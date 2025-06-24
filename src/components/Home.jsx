import React, { useState, useRef, useEffect } from 'react';
import { ScannerDetails } from './ScannerDetails';
import './Home.css';
import './Board.css';

const newsItems = [
  { date: "June 2025", text: "Robust-Kit website completed", isNew: true},
  { date: "May 2025", text: "Start development Robust-Kit website", isNew: false},
];

export default function Home() {
  const [showAlt, setShowAlt] = useState(false);
  const boardRef = useRef(null);
  const videoRef = useRef(null);
  const [playedBefore] = useState(Boolean(window.__hermesIntroPlayed));

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setShowAlt(entry.isIntersecting),
      {
        root: null,
        threshold: 0,
        rootMargin: '-90% 0px -90% 0px',
      }
    );
    if (boardRef.current) obs.observe(boardRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const seekToLastFrame = () => {
      const FRAME_OFFSET = 0.05;
      const target = Math.max(video.duration - FRAME_OFFSET, 0);
      try {
        video.currentTime = target;
      } catch (err) {
      }
      video.pause();
    };

    if (playedBefore) {
      if (video.readyState >= 1) {
        seekToLastFrame();
      } else {
        video.addEventListener('loadedmetadata', seekToLastFrame, { once: true });
      }
      return;
    }

    const markAsPlayed = () => {
      window.__hermesIntroPlayed = true;
    };

    const handleEnded = () => {
      seekToLastFrame();
    };

    video.addEventListener('play', markAsPlayed, { once: true });
    video.addEventListener('ended', handleEnded, { once: true });

    return () => {
      video.removeEventListener('play', markAsPlayed);
      video.removeEventListener('ended', handleEnded);
    };
  }, [playedBefore]);

  const badgeClass = showAlt ? 'badge error' : 'badge success';
  const detailsInitial = {
    scanner: 'Siemens',
    patientGroup: 'African',
    hospital: 'Private Clinic',
    labelingStandard: 'AHA-2017',
  };
  const detailsAlt = {
    scanner: 'GE Healthcare',
    patientGroup: 'European',
    hospital: 'Public Hospital',
    labelingStandard: 'Internal Protocol',
  };

  return (
    <div className="home">
      {/* Hero full-width */}
      <div className="hero">
        <video
          ref={videoRef}
          className="hero-shield"
          src="/intro.mp4"
          muted
          playsInline
          preload="auto"
          {...(!playedBefore ? { autoPlay: true } : {})}
        />
      </div>

      <section className="info-section news-section">
        <h2 className="section-title" style={{textAlign:'center'}}><span className='blue'>News</span> & <span className='blue'>Updates</span></h2>
        <div className="news-grid">
          {newsItems.map((item, index) => (
            <div className="news-card" key={index}>
              <div className="news-header">
                <span className="news-date blue">{item.date}</span>
                {item.isNew && <span className="news-badge">NEW</span>}
              </div>
              <p className="news-text">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM SECTION + BOARD */}
      <section className="problem-section">
        <div className="problem-content">
          <h2 className="problem-title">
            The <span className="blue">Problem</span>
          </h2>
          <p className="problem-text">
            Artificial intelligence models for medical image segmentation often show excellent performance in controlled
            environments — but fail silently when faced with new, real-world data. Even subtle changes in scanner type,
            patient population, disease prevalence, or clinical annotation standards can dramatically affect performance.
            These distribution shifts are often invisible to the human eye, yet they expose the model’s lack of robustness
            and can lead to unreliable or unsafe decisions in clinical settings. Today, no standard, training-free framework
            exists to test how models behave under these real-world conditions. That’s the problem Robust-Kit solves.
          </p>
        </div>

        <div ref={boardRef} className="board-wrapper">
          {/* cornice */}
          <img src="/large board.png" alt="Board frame" className="board-frame" />

          {/* cross-fade di due stati */}
          <div className="board-content">
            {/* stato iniziale */}
            <div className={`board-state initial ${showAlt ? 'fade-out' : 'fade-in'}`}>
              <ScannerDetails {...detailsInitial} />
              <div className="scanner-image">
                <img src="/rx.png" alt="CT scan" />
                <div className={badgeClass}>
                  <img src="/check.svg" alt="Check mark" />
                </div>
              </div>
            </div>

            {/* stato alternativo */}
            <div className={`board-state alt ${showAlt ? 'fade-in' : 'fade-out'}`}>
              <ScannerDetails {...detailsAlt} />
              <div className="scanner-image">
                <img src="/rx1.png" alt="CT scan alt" />
                <div className={badgeClass}>
                  <img src="/x.svg" alt="Error mark" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SECTION (solo testo + sfondo graduato) */}
      <section className="why-section">
        <div className="why-content">
          <h2 className="why-title">
            The <span className="blue">Why</span>
          </h2>
          <p className="why-text">
            Robust performance is not just about high accuracy — it’s about consistency, fairness, and trust under change. In
            the real world, models are deployed across different hospitals, patient populations, and imaging devices. Without
            understanding how performance shifts across these conditions, we risk deploying models that work well in some
            settings but fail in others — unpredictably and unequally.
          </p>
          <p className="why-text">
            Robust-Kit provides a practical and standardized way to measure this. It helps researchers, developers, and
            clinicians uncover hidden weaknesses, compare models fairly, and make robustness a first-class metric — just like
            accuracy. By doing so, it brings us one step closer to AI you can trust, even outside the lab.
          </p>
        </div>
      </section>

      {/* SEE-HOW SECTION */}
      <section className="see-how-section">
        <div className="see-how-content">
          <h2 className="see-how-title">
            Want to know if your model is <span className="bold blue">Robust</span>?
          </h2>
          <a href="/how">
            <img className="see-how-img" src="/how_it_works.png" alt="how_it_works" />
          </a>
        </div>
      </section>
    </div>
  );
}
