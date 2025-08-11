import React, { useState, useEffect } from 'react';

type Option = {
  text: string;
  scores?: Record<string, number>;
};

type QuestionType = 'multiple_choice' | 'slider';

type QuestionProps = {
  question: {
    id: string;
    type: QuestionType;
    prompt: string;
    options: Option[];
  };
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (questionId: string, value: string | number) => void;
};

const Question: React.FC<QuestionProps> = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  const [selected, setSelected] = useState<string | number | null>(null);

  useEffect(() => {
    setSelected(null); // reset on new question
  }, [question]);

  // Auto-advance when selected changes
  useEffect(() => {
    if (selected !== null) {
      const timer = setTimeout(() => {
        onAnswer(question.id, selected);
      }, 400); // 400ms delay for smooth UX
      return () => clearTimeout(timer);
    }
  }, [selected, question.id, onAnswer]);

  const renderOptions = () => {
    if (question.type === 'multiple_choice') {
      return question.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => setSelected(opt.text)}
          aria-pressed={selected === opt.text}
          className={`option-button ${selected === opt.text ? 'selected' : ''}`}
        >
          {opt.text}
        </button>
      ));
    } else if (question.type === 'slider') {
      // Render 1-5 slider with labels
      return (
        <div className="slider-container">
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={typeof selected === 'number' ? selected : 3}
            onChange={(e) => setSelected(Number(e.target.value))}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-valuenow={typeof selected === 'number' ? selected : 3}
          />
          <div className="slider-labels">
            <span>Never</span>
            <span>Rarely</span>
            <span>Sometimes</span>
            <span>Often</span>
            <span>Always</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="question-container" role="group" aria-labelledby={`q${questionNumber}-label`}>
      <div className="progress-bar" aria-label="Quiz progress">
        <div
          className="progress-fill"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>
      <h2 id={`q${questionNumber}-label`} className="question-prompt">
        {question.prompt}
      </h2>
      <div className="options-list">{renderOptions()}</div>
      <p className="progress-text">
        Question {questionNumber} of {totalQuestions}
      </p>
    </div>
  );
};

export default Question;
