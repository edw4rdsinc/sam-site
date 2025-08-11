import React from 'react';

type IntroProps = {
  text: string;
  startButtonText: string;
  onStart: () => void;
};

const Intro: React.FC<IntroProps> = ({ text, startButtonText, onStart }) => {
  return (
    <section className="intro-container" role="region" aria-label="Quiz introduction">
      <p className="intro-text">{text}</p>
      <button className="start-button" onClick={onStart} autoFocus>
        {startButtonText}
      </button>
      <style jsx>{`
        .intro-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 1rem;
          text-align: center;
          color: var(--slate);
          font-family: 'Rajdhani', sans-serif;
        }
        .intro-text {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          color: var(--slate);
        }
        .start-button {
          background-color: var(--teal);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.25rem;
          cursor: pointer;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }
        .start-button:hover,
        .start-button:focus {
          background-color: #107a70; /* darker teal */
          outline: none;
        }
      `}</style>
    </section>
  );
};

export default Intro;
