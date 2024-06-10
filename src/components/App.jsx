import '../styles/App.css';
import { useState } from 'react';
import Start from './Start';
import Main from './Main';

export default function App() {
  const [quizStarted, setQuizStarted] = useState(true);

  function startGame() {
    console.log('Game has started');
    setQuizStarted(true);
  }

  return (
    <div className="app-container">
      {!quizStarted && <Start startGame={startGame} />}
      {quizStarted && <Main />}
    </div>
  );
}
