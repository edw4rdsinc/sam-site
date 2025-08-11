import React from 'react';

type Archetype = {
  id: string;
  name: string;
  tagline: string;
  whyItMatters: string;
  automations: string[];
};

type Answer = {
  questionId: string;
  value: string | number;
};

type ResultsPreviewProps = {
  answers: Answer[];
  archetypes: Archetype[];
  onRequestFullPlan: () => void;
};

const ResultsPreview: React.FC<ResultsPreviewProps> = ({ archetypes, onRequestFullPlan }) => {
  // For now, assume the first two archetypes in the config are top matches.
  // Replace with real scoring logic later.
  const topTwo = archetypes.slice(0, 2);

  return (
    <section className="results-preview" aria-label="Quiz results preview">
      <h2>Your Top Matches</h2>
      {topTwo.map((a) => (
        <article key={a.id} className="archetype">
          <h3>{a.name}</h3>
          <p className="tagline">{a.tagline}</p>
          <p className="why-it-matters"><strong>Why this matters for you:</strong> {a.whyItMatters}</p>
        </article>
      ))}
      <div className="cta-buttons">
        <button className="primary" onClick={onRequestFullPlan}>
          Email me my full plan
        </button>
        <a
          href="https://calendly.com/your-story-call-link"
          target="_blank"
          rel="noopener noreferrer"
          className="secondary"
        >
          Book Your Story Call
        </a>
      </div>
      <style jsx>{`
        .results-preview {
          max-width: 600px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: 'Rajdhani', sans-serif;
          color: var(--slate);
        }
        .archetype {
          border-bottom: 1px solid var(--teal);
          padding-bottom: 1rem;
          margin-bottom: 1rem;
        }
        .tagline {
          font-style: italic;
          color: var(--teal);
        }
        .why-it-matters {
          margin-top: 0.5rem;
        }
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2rem;
        }
        .primary {
          background-color: var(--teal);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }
        .primary:hover,
        .primary:focus {
          background-color: #107a70;
          outline: none;
        }
        .secondary {
          color: var(--teal);
          font-weight: bold;
          align-self: center;
          text-decoration: underline;
          cursor: pointer;
        }
        .secondary:hover,
        .secondary:focus {
          color: #107a70;
          outline: none;
        }
      `}</style>
    </section>
  );
};

export default ResultsPreview;
