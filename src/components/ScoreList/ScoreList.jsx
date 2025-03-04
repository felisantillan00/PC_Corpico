import React, { useEffect, useState } from 'react';
import styles from './ScoreList.module.css';
import { Link } from 'react-router-dom';

const ScoreList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const sortedPlayers = storedPlayers.sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
  }, []);

  return (
    <div className={styles.scoreListContainer}>
      <h2 className={styles.title}>Ranking de Puntajes</h2>
      <div>
      <Link to="/results" className={styles.link}>Volver a Resultados</Link>
      </div>
      <ul className={styles.scoreList}>
        {players.map((player, index) => (
          <li key={player.name} className={styles.playerItem}>
            <span className={styles.rank}>{index + 1}</span>
            <span className={styles.playerName}>{player.name}</span>
            <span className={styles.playerScore}>{player.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreList;
