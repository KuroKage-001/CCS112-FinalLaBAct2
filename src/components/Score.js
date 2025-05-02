import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import './Score.css';

const Score = ({ correctAnswers, totalQuestions }) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const isPerfectScore = correctAnswers === totalQuestions;

  useEffect(() => {
    if (isPerfectScore) {
      celebratePerfectScore();
    }
  }, [isPerfectScore]);

  const celebratePerfectScore = () => {
    // First burst of confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        scalar: 1.2,
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Add some delayed confetti for extra effect
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 500);
  };

  return (
    <div className="score-container">
      <h2>Quiz Complete!</h2>
      <div className="score-details">
        <p>You got <span className="highlight">{correctAnswers}</span> out of <span className="highlight">{totalQuestions}</span> questions correct.</p>
        <p className="percentage">Your score: <span className="highlight">{percentage}%</span></p>
        {isPerfectScore && (
          <div className="perfect-score-message">
            <h3>🎉 Perfect Score! 🎉</h3>
            <p>Congratulations! You're a quiz master!</p>
          </div>
        )}
      </div>
      <button className="restart-button" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  );
};

export default Score; 