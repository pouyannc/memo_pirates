import { useState, useEffect } from 'react';
import Pirate from './components/Pirate';
import Header from './components/Header';
import GameOver from './components/GameOver';

function App() {
  const [score, setScore] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerInputs, setPlayerInputs] = useState([]);
  const [lose, setLose] = useState(false);
  
  const timer = ms => new Promise(res => setTimeout(res, ms));

  const pirates = ['mc', 'big', 'captain', 'whale'];
  const keys = new Map([
    ['ArrowUp', 'mc'],
    ['ArrowLeft', 'big'],
    ['ArrowRight', 'captain'],
    ['ArrowDown', 'whale']
  ])

  // displaying pirate animation when clicked or invoked through patterns
  const handlePirateClick = (e, pirate = undefined) => {
    if (!pirate) {
      // FIGURE OUT HOW TO TAKE FOCUS OFF
      if (e.key) {
        if (keys.has(e.key)) pirate = document.querySelector(`.${keys.get(e.key)}`);
        else return;
      } else pirate = e.target;
    } else pirate = document.querySelector(`.${pirate}`);

    pirate.nextSibling.play();
    pirate.parentNode.className = 'clicked';
    setTimeout(() => {
      pirate.parentNode.className = 'pirate-button';
    }, 600);

    if (!disabled) {
      console.log(pirate.className)
      setPlayerInputs(p => [...p, pirate.className]);
    }
  };

  // initial start of the first round (initial play or play again or reset)
  const handleGameStart = () => {
    setPattern([]);
    setPlayerInputs([]);
    setScore(0);
    setLose(false);
    setGameStarted(true);
  };

  // starting the next round
  const handleRound = () => {
    setDisabled(true);
    const randomPirate = pirates[Math.floor(Math.random()*pirates.length)];
    setPattern([...pattern, randomPirate]);
  };

  // plays the pattern when it is updated through handleRound
  useEffect(() => {
    // skipping the first render and when a game ends so that disabled stays true until new game starts. 
    // handleRound here to ensure pattern is emptied.
    if(pattern.length < 1) {
      if (gameStarted) {
        setTimeout(() => {
          handleRound();
        }, 1200);
      }
      return;
    }

    const playPattern = async () => {
      for (let pirate of pattern) {
        handlePirateClick(null, pirate);
        await timer(800);
      }
      setDisabled(false);
    }
    playPattern();
  }, [pattern]);

  // for checking the user input vs the given pattern
  useEffect(() => {
    if (playerInputs.length < 1) return;

    // when the player input does not match the pattern
    const handleGameOver = () => {
      setLose(true);
      setGameStarted(false);
      setDisabled(true);
    };
    if (playerInputs[playerInputs.length-1] !== pattern[playerInputs.length-1]) return handleGameOver();

    // when the player inputs match the pattern correctly
    const handleTurnWin = () => {
      window.removeEventListener('keydown', handlePirateClick);
      setDisabled(true);
      setScore(s => s+1);
      setPlayerInputs([]);
      setTimeout(() => {
        handleRound();
      }, 1200);
    };
    if (playerInputs.length === pattern.length) handleTurnWin();
  }, [playerInputs]);

  useEffect(() => {
    if (!disabled) window.addEventListener('keydown', handlePirateClick);

    return () => {window.removeEventListener('keydown', handlePirateClick);};
  }, [disabled])

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
