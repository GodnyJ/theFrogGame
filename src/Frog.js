import React from "react";

export default function Frog({bodyHeight, bodyWidth, bellyWidth, number}) {
    return (
        <div className='frog-box'>
          
        <div 
            className='frog'
            style={{
                '--body-height':`${bodyHeight}px`,
                '--body-width':`${bodyWidth}px`,
                '--belly-width': `${bellyWidth}px`,
                '--number': `${number}px`
            }}
        >
        
          <div className='body' style={{height: `var(--body-height)`, width: `var(--body-width)` }}>
            <div className='eyes'>

                <div className='eye left-eye'>
                  <div className='left-eye__w'>
                    <div className='left-eye__p'>
                    <div className='left-eye__m'></div>
                    </div>
                  </div>
                </div>

                <div className='eye right-eye'>
                  <div className='right-eye__w'>
                    <div className='right-eye__p'>
                    <div className='right-eye__m'></div>
                    </div>
                  </div>
                </div>

              </div>

            <div className='belly' style={{width: `var(--belly-width)`}}></div>
          </div>
          <div className='left-leg' style={{left: `var(--number)`}}></div>
          <div className='right-leg' style={{right: `var(--number)`}}></div>
          <div className='left-finger' style={{left: `var(--number)`}}></div>
          <div className='right-finger' style={{right: `var(--number)`}}></div>
        </div>
      </div>
    )
}