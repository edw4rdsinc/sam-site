import React from 'react';
import quizConfig from '../quiz-config.json';

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

function calculateScores(
  answers: Answer[],
  questions: typeof quizConfig.quiz.questions,
  archetypes: Archetype[]
): Record<string, number> {
  const scores: Record<string, number> = {};
  archetypes.forEach((a) => {
    scores[a.id] = 0;
  });
  const questionMap = new Map(questions.map((q) => [q.id, q]));

  answers.forEach(({ questionId, value }) => {
    const question = questionMap.get(questionId);
    if (!question) return;

    const option = question.options.find(
      (opt: any) => opt.text === value || opt.value === value
    );
    if (!option || !option.scores) return;

    Object.entries(option.scores).forEach(([archetypeId, pts]) => {
      if (archetypeId in scores) {
        scores[archetypeId] += pts as number;
      }
    });
  });

  return scores;
}

function getTopArchetypes(
  scores: Record<string, number>,
  archetypes: Archetype[],
  topN = 2
): Archetype[] {
  const sorted = Object.entries(scores)
    .sort(([, aScore], [, bScore]) => bScore - aScore)
    .slice(0, topN)
    .map(([id]) => archetypes.find((a) => a.id === id))
    .filter(Boolean) as Archetype[];

  return sorted;
}

const ResultsPreview: React.FC<ResultsPreviewProps> = ({
  answers,
  archetypes,
  onRequestFullPlan,
}) => {
  const scores = calculateScores(answers, quizConfig.quiz.questions, archetypes);
  const topTwo = getTopArchetypes(scores, archetypes, 2);

  return (
    <section className="results-preview" aria-label="Quiz results preview">
      <h2>Your Top Matches</h2>
      {topTwo.map((a) => (
        <article key={a.id} className="archetype">
          <h3>{a.name}</h3>
          <p className="tagline">{a.tagline}</p>
          <p className="why-it-matters">
            <strong>Why this matters for you:</strong> {a.whyItMatters}
          </p>
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
