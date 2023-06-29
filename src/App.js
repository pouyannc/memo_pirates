import { useState, useEffect } from 'react';
import Pirate from './components/pirate';
import Header from './components/header';

function App() {
  const [score, setScore] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const pirates = ['mc', 'big', 'captain', 'whale'];
  const timer = ms => new Promise(res => setTimeout(res, ms));

  const handlePirateClick = (e, pirate = undefined) => {
    if (!pirate) pirate = e.target;
    else pirate = document.querySelector(`.${pirate}`);
    pirate.nextSibling.play();
    pirate.parentNode.className = 'clicked';
    setTimeout(() => {
      pirate.parentNode.className = 'pirate-button';
    }, 600);
  };

  const handleRound = () => {
    setDisabled(true);
    const randomPirate = pirates[Math.floor(Math.random()*pirates.length)];
    setPattern([...pattern, randomPirate]);
  };

  // plays the pattern when it is updated through handleRound
  useEffect(() => {
    const playPattern = async () => {
      for (let pirate of pattern) {
        handlePirateClick(null, pirate);
        await timer(900);
      }
      setDisabled(false);
    }
    playPattern();
  },[pattern])

  return (
    <main>
      <Header score={score} handleStart={handleRound} />

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
    </main>
  );
}

export default App;
