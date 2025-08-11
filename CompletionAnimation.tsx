import React, { useEffect, useState } from 'react';

type CompletionAnimationProps = {
  type: 'checkmark' | 'thumbsup';
};

const CompletionAnimation: React.FC<CompletionAnimationProps> = ({ type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setVisible(true);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`completion-animation ${visible ? 'visible' : ''}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        fontSize: '5rem',
        color: 'var(--teal)',
      }}
    >
      {type === 'checkmark' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
          aria-hidden="true"
          width="80"
          height="80"
        >
          <circle
            className="circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="var(--teal)"
            strokeWidth="2"
          />
          <path
            className="check"
            fill="none"
            stroke="var(--teal)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27l7 7 16-16"
          />
          <style jsx>{`
            .circle {
              stroke-dasharray: 157;
              stroke-dashoffset: 157;
              animation: dash 0.8s forwards ease-out;
            }
            .check {
              stroke-dasharray: 48;
              stroke-dashoffset: 48;
              animation: dash 0.3s 0.8s forwards ease-out;
            }
            @keyframes dash {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </svg>
      )}
      {type === 'thumbsup' && (
        <span role="img" aria-label="Thumbs up">
          👍
        </span>
      )}
    </div>
  );
};

export default CompletionAnimation;
