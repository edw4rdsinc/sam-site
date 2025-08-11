import React, { useState } from 'react';

type ShareBlockProps = {
  url?: string;
};

const ShareBlock: React.FC<ShareBlockProps> = ({ url = typeof window !== 'undefined' ? window.location.href : '' }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess('Link copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch {
      setCopySuccess('Failed to copy.');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent('Check out this helpful automation quiz');
    const body = encodeURIComponent(`Hey,\n\nI thought you might find this automation quiz helpful:\n${url}\n\nGive it a try!`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="share-block" role="region" aria-label="Share this quiz">
      <p>Found this helpful? Share it with a friend!</p>
      <div className="buttons">
        <button onClick={handleCopy} aria-label="Copy quiz link to clipboard">
          Copy Link
        </button>
        <button onClick={handleEmailShare} aria-label="Share quiz link via email">
          Email Share
        </button>
      </div>
      {copySuccess && <p className="copy-feedback">{copySuccess}</p>}
      <style jsx>{`
        .share-block {
          margin-top: 2rem;
          text-align: center;
          font-family: 'Rajdhani', sans-serif;
          color: var(--slate);
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        button {
          background-color: var(--teal);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        button:hover,
        button:focus {
          background-color: #107a70;
          outline: none;
        }
        .copy-feedback {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: var(--teal);
        }
      `}</style>
    </div>
  );
};

export default ShareBlock;
