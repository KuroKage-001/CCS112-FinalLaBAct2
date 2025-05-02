import React, { useState } from 'react';
import './App.css';
import Question from './components/Question';
import Score from './components/Score';
import quizData from './data/quizData';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or show score
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="App">
      <div className="quiz-container">
        <h1>Multiple Choice Quiz</h1>
        {showScore ? (
          <Score correctAnswers={score} totalQuestions={quizData.length} />
        ) : (
          <>
            <div className="progress">
              Question {currentQuestion + 1} of {quizData.length}
            </div>
            <Question
              question={quizData[currentQuestion].question}
              options={quizData[currentQuestion].options}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={handleAnswerSelect}
            />
            <button
              className="next-button"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
