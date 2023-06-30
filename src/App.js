import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useFirstRender } from './hooks/useFirstRender';
import Pirate from './components/pirate';
import Header from './components/header';
import GameOver from './components/gameOver';

function App() {
  const [score, setScore] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerInputs, setPlayerInputs] = useState([]);
  const [lose, setLose] = useState(false);

  const pirates = ['mc', 'big', 'captain', 'whale'];
  const timer = ms => new Promise(res => setTimeout(res, ms));
  const firstRender = useFirstRender();

  const handlePirateClick = (e, pirate = undefined) => {
    if (!pirate) pirate = e.target;
    else pirate = document.querySelector(`.${pirate}`);
    pirate.nextSibling.play();
    pirate.parentNode.className = 'clicked';
    timer(1000);
    setTimeout(() => {
      pirate.parentNode.className = 'pirate-button';
    }, 600);

    if (!disabled) {
      setPlayerInputs([...playerInputs, pirate.className]);
    }
  };

  const handleGameStart = () => {
    setPlayerInputs([]);
    setScore(0);
    setLose(false);
    setGameStarted(true);
    handleRound();
  };

  const handleRound = () => {
    setDisabled(true);
    const randomPirate = pirates[Math.floor(Math.random()*pirates.length)];
    setPattern([...pattern, randomPirate]);
  };

  const handleGameOver = () => {
    setPattern([]);
    setLose(true);
    setGameStarted(false);
    setDisabled(true);
  };

  const handleTurnWin = () => {
    setScore(score+1);
    setPlayerInputs([]);
    setTimeout(() => {
      handleRound();
    }, 1200);
  };

  // plays the pattern when it is updated through handleRound
  useEffect(() => {
    // skipping the first render so that disabled stays true until play is clicked
    if(firstRender) return;

    const playPattern = async () => {
      for (let pirate of pattern) {
        handlePirateClick(null, pirate);
        await timer(900);
      }
      setDisabled(false);
    }
    playPattern();
  }, [pattern]);

  // for checking the user input vs the given pattern
  useEffect(() => {
    if (firstRender) return;

    if (playerInputs[playerInputs.length-1] !== pattern[playerInputs.length-1]) return handleGameOver();

    if (playerInputs.length === pattern.length) handleTurnWin();
  }, [playerInputs]);

  return (
    <main>
      <Header score={score} handleStart={handleGameStart} btnText={gameStarted ? 'Reset' : 'Play'} />

      <div className='pirates'>
        <div className='row1'>
          <Pirate className='mc' sound='assets/mc_sound.mp3' disabled={disabled} onClick={handlePirateClick} />
        </div>
        <div className='row2'>
          <Pirate className='big' sound='assets/big_sound.mp3' disabled={disabled} onClick={handlePirateClick} />
          <Pirate className='captain' sound='assets/captain_sound.mp3' disabled={disabled} onClick={handlePirateClick} />
        </div>
        <div className='row3'>
          <Pirate className='whale' sound='assets/whale_sound.mp3' disabled={disabled} onClick={handlePirateClick} />
        </div>
      </div>

      {lose && <GameOver score={score} />}
    </main>
  );
}

export default App;
