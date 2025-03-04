import React, { useEffect, useState, useContext } from 'react';
import Question from '../Question/Question.jsx';
import { ScoreContext } from '../../context/ScoreContext';
import { useNavigate } from 'react-router-dom';
import styles from './QuestionContainer.module.css';

const QuestionContainer = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { addPoints, level } = useContext(ScoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const module = level === 'primario' ? await import('../../data/asyncMock.js') : await import('../../data/asyncMock2.js');
        const questionData = await module.getQuestion();
        const shuffledQuestions = questionData.sort(() => Math.random() - 0.5);
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, [level]);

  const handleNextQuestion = (selectedOptions) => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctOptions = currentQuestion.options.filter(option => option.correct);

    const pointsPerCorrectOption = currentQuestion.pointsPerCorrectAnswer / correctOptions.length;
    const pointsPerIncorrectOption = pointsPerCorrectOption / 2; // La mitad de los puntos de una correcta

    let totalPoints = 0;

    selectedOptions.forEach(optionId => {
      const selectedOption = currentQuestion.options.find(option => option.id === optionId);
      if (selectedOption.correct) {
        totalPoints += pointsPerCorrectOption;
      } else {
        totalPoints -= pointsPerIncorrectOption;
      }
    });

    addPoints(totalPoints, currentQuestion, selectedOptions);

    if (isLastQuestion) {
      navigate('/results');
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
      <>
        {questions.length > 0 ? (
          <Question
            {...questions[currentQuestionIndex]}
            onNext={handleNextQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        ) : (
          <p className={styles.loading}>Cargando...</p>
        )}
      </>
  );
};

export default QuestionContainer;