import React from 'react';
import './App.css';
import Grid from './Grid'
import Frog from './Frog';

function App() {
  return (
    <div className="App">
      <div className='description'>
        <p>Below is a lake with dimensions 10x6 fields. Frogs are marked as green rectangles. Frog with a small blue rectangle is a male; with a purple rectangle female.</p>
      </div>
      <Grid/>
      <div className='frogs'>
        <Frog height={"tall"} thickness={"fat"}/>
        <Frog height={"tall"} thickness={"slim"}/>
        <Frog height={"short"} thickness={"fat"}/>
        <Frog height={"short"} thickness={"slim"}/>
        
      </div>
    </div>
  );
}

export default App;
