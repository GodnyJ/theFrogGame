import React from "react";
import "./App.css";
import Grid from "./Grid";
import Frog from "./Frog";

export default function App() {
  return (
    <div className="App">
      <div className="description">
        <p>
          Below is a lake with dimensions 10x6 fields. Frog with a small pink
          cheecks is a female, frog without cheeks is a male.
        </p>
        <ul className="rules">
          <li>
            Each frog can jump on an empty field (select the frog, the empty
            field and click the jump button).
          </li>
          <li>A male frog can jump 3 fields (including diagonals).</li>
          <li>A female frog can jump 2 fields (including diagonals).</li>
          <li>
            Each frog have two characteristics, which are selected from the
            following options: tall, short, fat, slim.
          </li>
          <li>
            Two frogs of different genders that are adjacent can reproduce
            (select one male and one female, then click the reproduce button).
          </li>
          <li>
            The new frog is placed in the first available space adjacent to the
            mother.
          </li>
          <li>
            The new frog inherits one characteristic from each parent (one from
            the mother and one from the father).
          </li>
        </ul>
      </div>
      <div className="l-frogs">
        <div className="left-side">
          <div className="l-frog">
            <Frog height={"tall"} thickness={"fat"} gender={"female"} />
            <p>This is tall fat female</p>
          </div>
          <div className="l-frog">
            <Frog height={"tall"} thickness={"slim"} gender={"male"} />
            <p>This is tall slim male</p>
          </div>
        </div>
        <div className="right-side">
          <div className="l-frog">
            <Frog height={"short"} thickness={"fat"} gender={"female"} />
            <p>This is short fat female</p>
          </div>
          <div className="l-frog">
            <Frog height={"short"} thickness={"slim"} gender={"male"} />
            <p>This is short slim male</p>
          </div>
        </div>
      </div>
      <Grid />
    </div>
  );
}