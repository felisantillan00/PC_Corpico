import React, { useState, useEffect } from 'react';
import styles from './Question.module.css';

const colors = [
  '#3E64AC',
  '#712D85',
  '#E22B14',
  '#EA672E',
  '#FFDA1F',
  '#35AC75',
  '#5FC3E6'
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Question = ({ title, options, onNext, timerExpired, questionNumber, totalQuestions }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

  useEffect(() => {
    setSelectedOptions([]);
    setBackgroundColor(getRandomColor());
  }, [title]);

  const handleOptionChange = (event) => {
    const optionId = parseInt(event.target.value);
    setSelectedOptions(prevSelectedOptions =>
      prevSelectedOptions.includes(optionId)
        ? prevSelectedOptions.filter(id => id !== optionId)
        : [...prevSelectedOptions, optionId]
    );
  };

  const handleNextClick = () => {
    onNext(selectedOptions);
  };

  return (
    <div className={styles.questionContainer} style={{ background: `radial-gradient(ellipse, #FFFFFF, ${backgroundColor})` }}>
      <div className={styles.progress}>
        {questionNumber}/{totalQuestions}
      </div>
      <h2 className={styles.questionTitle}>{title}</h2>
      <ul className={styles.optionsList}>
        {options.map((option) => (
          <li key={option.id} className={styles.optionItem}>
            <label className={styles.optionLabel}>
              <input
                type="checkbox"
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={handleOptionChange}
                className={styles.optionInput}
              />{' '}
              {option.answerText.startsWith('../') ? (
                <img src={option.answerText} alt="option" className={styles.optionImage} />
              ) : (
                option.answerText
              )}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleNextClick} disabled={selectedOptions.length === 0} className={styles.nextButton}>
        Siguiente
      </button>
    </div>
  );
};

export default Question;
