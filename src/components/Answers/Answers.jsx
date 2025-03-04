import React, { useState, useContext, useEffect } from 'react';
import { ScoreContext } from '../../context/ScoreContext';
import { Link } from 'react-router-dom';
import styles from './Answers.module.css';
import { getQuestion } from '../../data/asyncMock.js';

const Answers = () => {
  const { answers, score, setAnswers, setScore } = useContext(ScoreContext);
  const [questionLength, setQuestionLength] = useState(null);

  useEffect(() => {
    const storedAnswers = localStorage.getItem('answers');
    const storedScore = localStorage.getItem('score');

    if (storedAnswers) setAnswers(JSON.parse(storedAnswers));
    if (storedScore) setScore(parseFloat(storedScore));

    const fetchQuestionLength = async () => {
      const questionData = await getQuestion();
      setQuestionLength(questionData.length);
    };

    fetchQuestionLength();
  }, [setAnswers, setScore]);

  const formatPoints = (points) => {
    const nonNegativePoints = Math.max(points, 0);
    return Number.isInteger(nonNegativePoints) ? nonNegativePoints : nonNegativePoints.toFixed(2);
  };

  return (
    <div className={styles.answersContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Respuestas</h2>
        <Link to="/results" className={styles.resultsLink}>Volver a Resultados</Link>
      </div>
      <p className={styles.info}>
        <span className={styles.score}>Puntaje obtenido: {score}/{questionLength}</span>
        <span className={styles.selectedOption}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azul: Tu respuesta</span>
      </p>
      {answers.map((question, index) => (
        <div key={index} className={styles.questionContainer}>
          <h3 className={styles.questionTitle}>{question.title}</h3>
          <ul className={styles.optionsList}>
            {question.options.map(option => (
              <li
                key={option.id}
                className={`${styles.optionItem} 
                            ${option.correct ? styles.correctOption : ''} 
                            ${question.selectedOptions.includes(option.id) ? styles.selectedOption : ''}`}
              >
                {option.answerText.startsWith('../') ? (
                  <img src={option.answerText} alt="option" className={styles.optionImage} />
                ) : (
                  <>
                    {option.answerText}
                    {option.correct && <span className={styles.correctText}>(Correcto)</span>}
                    {!option.correct && question.selectedOptions.includes(option.id) && (
                      <span className={styles.cross}>✗</span>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.points}>
            <span>Puntos obtenidos: {formatPoints(question.pointsObtained)} / {question.pointsPerCorrectAnswer}</span>
          </div>
          <p className={styles.explanation}>{question.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default Answers;


