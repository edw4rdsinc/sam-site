import React, { useState, useEffect } from 'react';
import quizConfig from '../quiz-config.json';

import Question from './Question';
import Intro from './Intro';
import ResultsPreview from './ResultsPreview';
import EmailGate from './EmailGate';
import CompletionAnimation from './CompletionAnimation';
import ShareBlock from './ShareBlock';

type Answer = {
  questionId: string;
  value: string | number;
};

const QuizContainer: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResultsPreview, setShowResultsPreview] = useState(false);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [completed, setCompleted] = useState(false);

  const questions = React.useMemo(() => {
    // Randomize questions except keep dependent questions in order if needed
    // For now assume all independent; add logic if needed later
    return [...quizConfig.quiz.questions].sort(() => Math.random() - 0.5);
  }, []);

  const totalQuestions = questions.length;

  const handleStart = () => {
    setStarted(true);
  };

  const handleAnswer = (questionId: string, value: string | number) => {
    setAnswers(prev => [...prev, { questionId, value }]);
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResultsPreview(true);
    }
  };

  const handleRequestFullPlan = () => {
    setShowEmailGate(true);
  };

  const handleEmailSubmitted = () => {
    setShowEmailGate(false);
    setCompleted(true);
  };

  if (!started) {
    return <Intro text={quizConfig.quiz.intro.text} startButtonText={quizConfig.quiz.intro.startButtonText} onStart={handleStart} />;
  }

  if (completed) {
    return <CompletionAnimation type={quizConfig.quiz.completionAnimation} />;
  }

  if (showEmailGate) {
    return <EmailGate fields={quizConfig.quiz.emailGate.fields} privacyText={quizConfig.quiz.emailGate.privacyText} submitText={quizConfig.quiz.emailGate.submitButtonText} onSubmitted={handleEmailSubmitted} />;
  }

  if (showResultsPreview) {
    return <ResultsPreview answers={answers} archetypes={quizConfig.quiz.archetypes} onRequestFullPlan={handleRequestFullPlan} />;
  }

  return (
    <Question
      question={questions[currentIndex]}
      questionNumber={currentIndex + 1}
      totalQuestions={totalQuestions}
      onAnswer={handleAnswer}
    />
  );
};

export default QuizContainer;
