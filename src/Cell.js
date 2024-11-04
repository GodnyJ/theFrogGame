import React, { useState } from "react";
import classNames from 'classnames';
import "./cell.css";

const initialFrogs = [
  {
    x: 0,
    y: 0,
    frog: {
      gender: "male",
      height: "tall",
      thickness: "slim",
    },
  },
  {
    x: 1,
    y: 0,
    frog: {
      gender: "male",
      height: "tall",
      thickness: "slim",
    },
  },
];

export default function Cell({ rows, cols }) {
  const [cells, setCells] = useState(
    Array.from({ length: rows * cols }, (_, index) => {
        const x = index % cols;
        const y = Math.floor(index / cols);
        return({
      x,
      y,
      id: index,
      frog: initialFrogs.find((frog) => frog.x === x && frog.y === y) ?? null, 
    })})
  );

  const [source, setSource] = useState(null); //komórka pierwsza korą klikam
  const [target, setTarget] = useState(null); //druga

  const canJump = source?.frog !== null && target?.frog === null;
  const canReproduce = source?.frog !== null && target?.frog !== null; //mam żabę na jednej i drugiej pozycji

  const handleCellClick = (cell) => {
    if (source === null) {
      if (cell.frog === null) {
        console.log("kliknij żabę");
        return;
      }
      setSource(cell);
      return;
    } else {
      if (source === cell) {
        setSource(null);
        setTarget(null);
        return;
      }
      if (target === null) {
        if (cell.frog === null) {
          setTarget(cell); //sprawdzić czy komórka którą klikam jest w odpowiedniej odległości
          return;
        } else {
          console.log("na później"); //sprawdzić czy żaba jest w odpowiedniej odległości
          setTarget(cell);
          return;
        }
      }
    }
  };
console.log(cells);
  return (
    <div className="siatkaTest">
      {cells.map((cell) => (
        <div
          key={cell.id}
          className={classNames({
            cell: true,
            checked: cell === source || cell === target,
            frog: cell.frog !== null,
        })}
          onClick={() => handleCellClick(cell)}
        ></div>
      ))}
    </div>
  );
}
