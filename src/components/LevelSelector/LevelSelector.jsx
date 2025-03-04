import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScoreContext } from '../../context/ScoreContext';
import styles from './LevelSelector.module.css';

const LevelSelector = () => {
  const { resetScore } = useContext(ScoreContext);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    resetScore();
  }, []);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className={styles.levelSelector}>
      <h1 className={styles.title}>Bienvenido/a al Cuestionario Cooperativo</h1>
      <h2 className={styles.subtitle}>Elegí tu nivel:</h2>
      <Link to='/playername?level=primario'>
        <button className={styles.levelButton}>Primario</button>
      </Link>
      <Link to='/playername?level=secundario'>
        <button className={styles.levelButton}>Secundario</button>
      </Link>
      <button
        className={`${styles.instructionsButton} ${showInstructions ? styles.active : ''}`}
        onClick={toggleInstructions}
      >
        Instrucciones
      </button>
      {showInstructions && (
        <div className={styles.instructions}>
          <p><span className={styles.step1}>1)</span> Seleccioná tu nivel escolar e ingresá tu nombre.</p>
          <p><span className={styles.step2}>2)</span> Para cada pregunta, elegí <u>la</u> o <u>las</u> opciones que consideres correctas. Luego apretá siguiente.</p>
          <p><span className={styles.step3}>3)</span> Las preguntas tratan sobre cooperativismo, cultura general y cuidado del medio ambiente.</p>
          <p><span className={styles.step4}>4)</span> Las respuestas correctas seleccionadas suman puntos, las incorrectas restan puntos y las respuestas correctas que no se marcaron no restan ni suman puntos.</p>
          <p><span className={styles.step5}>5)</span> Al final del cuestionario, se indicarán los puntos obtenidos. Asimismo, se puede ingresar al ranking y a la explicación de las respuestas a cada pregunta.</p>
          <p><span className={styles.step6}>6)</span> ¡A divertirse!</p>
        </div>
      )}
    </div>
  );
};

export default LevelSelector;
