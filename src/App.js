import React from 'react';
import './App.css';
import Cell from './Cell';

function App() {
  return (
    <div className="App">
      <div className='description'>
        <p>Below is a lake with dimensions 10x6 fields. Frogs are marked as green rectangles. Frog with a small blue rectangle is a male; with a purple rectangle female.</p>
      </div>
      <Cell rows={6} cols={10} />
      
    </div>
  );
}

export default App;
