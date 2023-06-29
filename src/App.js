import { useState, useEffect } from 'react';
import Pirate from './components/pirate';
import Header from './components/header';

function App() {
  const [score, setScore] = useState(0);
  const [pattern, setPattern] = useState([3, 4]);
  const [disabled, setDisabled] = useState(false);

  const handlePirateClick = (e) => {
    e.target.nextSibling.play();
    e.target.parentNode.className = 'clicked';
    setTimeout(() => {
      e.target.parentNode.className = undefined;
    }, 600);
  };

  return (
    <main>
      <Header score={score}/>

      <div className='pirates'>
        <div className='row1'>
          <Pirate className='mc' sound='assets/mc_sound.mp3' onClick={handlePirateClick} />
        </div>
        <div className='row2'>
          <Pirate className='big' sound='assets/big_sound.mp3' onClick={handlePirateClick} />
          <Pirate className='captain' sound='assets/captain_sound.mp3' onClick={handlePirateClick} />
        </div>
        <div className='row3'>
          <Pirate className='whale' sound='assets/whale_sound.mp3' onClick={handlePirateClick} />
        </div>
      </div>
    </main>
  );
}

export default App;
