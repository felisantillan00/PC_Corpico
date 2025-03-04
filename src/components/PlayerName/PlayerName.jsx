import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ScoreContext } from '../../context/ScoreContext';
import { Link } from 'react-router-dom';
import styles from './PlayerName.module.css';

const PlayerName = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setPlayerName, setLevel } = useContext(ScoreContext);

  const location = useLocation();
  const level = new URLSearchParams(location.search).get('level');

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    if (storedPlayers.find(player => player.name === name)) {
      setError('El nombre ya existe. Por favor, ingresa otro nombre.');
      return;
    }

    setPlayerName(name);
    setLevel(level);
    storedPlayers.push({ name, score: 0, level });
    localStorage.setItem('players', JSON.stringify(storedPlayers));
    navigate('/quiz');
  };

  return (
    <div className={styles.playerName}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">Continuar</button>
      </form>
      <Link to="/">
        <button className={styles.volverButton}>&lt;&lt; Volver</button>
      </Link>
    </div>
  );
};

export default PlayerName;

