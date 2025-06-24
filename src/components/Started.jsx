import React from 'react';
import './Started.css';

export default function Started() {
  return (
    <>
      <div className="started">
        <section className="started-hero">
          <div className="line1">
            <h1 className="normal">Want to know how </h1>
            <h1 className="bold blue">Robust </h1>
            <h1 className="normal">your model really is?</h1>
          </div>
          <h3 className="normal">
            Robust-Kit lets you test it without retraining or full access to the training data.
          </h3>
        </section>

        <div className="board-row-started">
          {[0, 1, 2].map((idx) => {
            let href, downloadAttr, targetAttr, relAttr;
            if (idx === 0) {
              href = 'https://anonymous.4open.science/r/robust-kit/README.md';
              targetAttr = '_blank';
              relAttr = 'noopener noreferrer';
            } else if (idx === 1) {
              href = '/Robust-Kit.pdf';
              downloadAttr = true;
            } else {
              href = 'mailto:email@anonymized.com';
            }

            return (
              <a
                key={idx}
                href={href}
                {...(downloadAttr ? { download: '' } : {})}
                {...(targetAttr ? { target: targetAttr } : {})}
                {...(relAttr ? { rel: relAttr } : {})}
                className="board-link-reset"
              >
                <div className="board-wrapper-started">
                  <img
                    className="board-img-started"
                    src="/stone2.png"
                    alt={`Board ${idx}`}
                  />

                  {/* Testo e icona sovrapposti */}
                  <div className="board-text-started">
                    {/* Icona sopra il titolo */}
                    {idx === 0 && (
                      <>
                        <img
                          src="/icons/github.svg"
                          alt="GitHub icon"
                          className="overlay-icon-started"
                        />
                        <h3 className="overlay-title-started normal">
                          Try it on GitHub
                        </h3>
                      </>
                    )}
                    {idx === 1 && (
                      <>
                        <img
                          src="/icons/paper.svg"
                          alt="Paper icon"
                          className="overlay-icon-started"
                        />
                        <h3 className="overlay-title-started normal">
                          Download the Paper
                        </h3>
                      </>
                    )}
                    {idx === 2 && (
                      <>
                        <img
                          src="/icons/contact.svg"
                          alt="Contact icon"
                          className="overlay-icon-started"
                        />
                        <h3 className="overlay-title-started normal">
                          Contact us
                        </h3>
                      </>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="quick-started">
        <div className="quickstart-container">
          <h2 className="quickstart-title normal">
            Quick <span className="blue-text">Start</span>
          </h2>

          <div className="quickstart-step">
            <h3 className="step-heading normal">
              Step&nbsp;1&nbsp;– <span className="blue-text">Install dependencies</span>
            </h3>
            <pre className="code-block">
pip install -r requirements.txt
            </pre>
          </div>

          <div>
            <h3 className="step-heading normal">
              Step&nbsp;2&nbsp;– <span className="blue-text">Run robustness test</span>
            </h3>
            <pre className="code-block">
python robust‐kit.py --shift shift_name --model_name model_name --dataset dataset_name --device cuda_or_cpu
            </pre>
          </div>

          <div className="quickstart-step">
            <h3 className="step-heading2 normal">
              Directly Evaluate Model Performance, if any predictions
            </h3>
            <pre className="code-block">
python eval/eval.py --dataset dataset_name --model_type open_or_closed --predictions_path ./results/
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}
