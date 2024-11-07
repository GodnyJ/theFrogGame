import React from "react";

const frogTypes = {
  tall: {
    fat: {
      bodyHeight: 65,
      bodyWidth: 50,
      bellyWidth: 40,
      number: 5,
    },
    slim: {
      bodyHeight: 65,
      bodyWidth: 30,
      bellyWidth: 20,
      number: 15,
    },
  },
  short: {
    fat: {
      bodyHeight: 50,
      bodyWidth: 50,
      bellyWidth: 40,
      number: 5,
    },
    slim: {
      bodyHeight: 50,
      bodyWidth: 24,
      bellyWidth: 18,
      number: 20,
    },
  },
};

export default function Frog({ height, thickness, gender }) {
  const { bodyHeight, bodyWidth, bellyWidth, number } =
    frogTypes[height][thickness];

  return (
    <div className="frog-box">
      <div
        className="frog"
        style={{
          "--body-height": `${bodyHeight}px`,
          "--body-width": `${bodyWidth}px`,
          "--belly-width": `${bellyWidth}px`,
          "--number": `${number}px`,
        }}
      >
        <div
          className="body"
          style={{ height: `var(--body-height)`, width: `var(--body-width)` }}
        >
          <div className="eyes">
            <div className="eye left-eye">
              <div className="left-eye__w">
                <div className="left-eye__p">
                  <div className="left-eye__m"></div>
                </div>
              </div>
            </div>

            <div className="eye right-eye">
              <div className="right-eye__w">
                <div className="right-eye__p">
                  <div className="right-eye__m"></div>
                </div>
              </div>
            </div>
          </div>
          {gender === "female" ? (
            <div className="cheeks">
              <div className="right-cheek cheek"></div>
              <div className="left-cheek cheek"></div>
            </div>
          ) : null}

          <div className="smile">)</div>
          <div className="belly" style={{ width: `var(--belly-width)` }}></div>
        </div>
        <div className="left-leg" style={{ left: `var(--number)` }}></div>
        <div className="right-leg" style={{ right: `var(--number)` }}></div>
        <div className="left-finger" style={{ left: `var(--number)` }}></div>
        <div className="right-finger" style={{ right: `var(--number)` }}></div>
      </div>
    </div>
  );
}
