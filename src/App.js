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
      <Grid rows={6} cols={10} />
      <div className='frogs'>
        {/* niska gruba */}
        <Frog bodyHeight={50} bodyWidth={50} bellyWidth={40} number={5}/>
        <Frog bodyHeight={50} bodyWidth={24} bellyWidth={18} number={20}/>
        <Frog bodyHeight={65} bodyWidth={30} bellyWidth={20} number={15}/>
        <Frog bodyHeight={65} bodyWidth={50} bellyWidth={40} number={5} />
        
      </div>
    </div>
  );
}

export default App;
