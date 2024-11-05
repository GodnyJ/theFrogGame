import React from "react";

export default function Frog() {
    return (
        <div className='frog-box'>
          
        <div className='frog'>
        
          <div className='body'>
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

            <div className='belly'></div>
          </div>
          <div className='left-leg'></div>
          <div className='right-leg'></div>
          <div className='left-finger'></div>
          <div className='right-finger'></div>
        </div>
      </div>
    )
}