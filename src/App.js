import { useState, useEffect } from 'react';
import Pirate from './components/pirate';
import Header from './components/header';

function App() {
  return (
    <main>
      <Header />

      <div className='pirates'>
        <div className='row1'>
          <Pirate className='mc' />
        </div>
        <div className='row2'>
          <Pirate className='big' />
          <Pirate className='captain' />
        </div>
        <div className='row3'>
          <Pirate className='whale' />
        </div>
      </div>
    </main>
  );
}

export default App;
