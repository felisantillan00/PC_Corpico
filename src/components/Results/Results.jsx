import React, { useContext, useState, useEffect } from 'react';
import { ScoreContext } from '../../context/ScoreContext';
import { Link } from 'react-router-dom';
import styles from './Results.module.css';

const Results = () => {
  const { score, playerName, saveScoreToLocalStorage, level } = useContext(ScoreContext);
  const [questionLength, setQuestionLength] = useState(null);

  useEffect(() => {
    const fetchQuestionLength = async () => {
      const module = level === 'primario' ? await import('../../data/asyncMock.js') : await import('../../data/asyncMock2.js');
      const questionData = await module.getQuestion();
      setQuestionLength(questionData.length);
    };

    fetchQuestionLength();
  }, []);

  useEffect(() => {
    if (playerName && score >= 0) {
      saveScoreToLocalStorage();
    }
  }, [score, playerName, saveScoreToLocalStorage]);

  const getFeedbackMessage = (score, questionLength) => {
    if (questionLength === 0) return '';
    const percentage = (score / questionLength) * 100;

    if (percentage === 100) return '¡Puntaje perfecto! Felicitaciones';
    if (percentage >= 75) return '¡Excelente! Seguí así';
    if (percentage >= 60) return '¡Muy bien!';
    if (percentage >= 40) return '¡Bien!';
    return '¡Siempre se puede mejorar!';
  };

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>Resultados</h2>
      <div className={styles.scoreContainer}>
        <span className={styles.label}>Tu puntaje final es: </span>
        {questionLength === null ? (
          <span className={styles.score}>...</span>
        ) : (
          <>
            <span className={styles.score}>{score}/{questionLength}</span>
            <span className={styles.feedback}>{getFeedbackMessage(score, questionLength)}</span>
          </>
        )}
      </div>
      <div className={styles.linkContainer}>
        <Link to="/answers" className={styles.link}>Ver respuestas</Link>
        <Link to="/scorelist" className={styles.link}>Ranking</Link>
      </div>
      <div className={styles.linkContainer}>
        <Link to="/" className={styles.link}>&lt;&lt; Volver a la selección de nivel</Link>
      </div>
    </div>
  );
};

export default Results;