import TopBar from './components/TopBar/TopBar';
import LevelSelector from './components/LevelSelector/LevelSelector';
import QuestionContainer from './components/QuestionContainer/QuestionContainer';
import Results from './components/Results/Results';
import PlayerName from './components/PlayerName/PlayerName';
import ScoreList from './components/ScoreList/ScoreList';
import Answers from './components/Answers/Answers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScoreProvider } from './context/ScoreContext.jsx';

function App() {
  return (
    <>
    <TopBar />
    <ScoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LevelSelector />} />
          <Route path="/quiz" element={<QuestionContainer />} />
          <Route path="/results" element={<Results />} />
          <Route path="/playername" element={<PlayerName />} />
          <Route path="/scorelist" element={<ScoreList />} />
          <Route path="/answers" element={<Answers />} />
        </Routes>
      </BrowserRouter>
    </ScoreProvider>
    </>
  );
}

export default App;


