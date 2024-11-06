import React from "react";
import classNames from "classnames";
import './Cell.css'
import "./Grid.css";
import Frog from "./Frog";

export default function Cell({
    cell, 
    source,
    target,
    jumpOptions,
    handleCellClick,
}) {

  return (
    <div
            key={cell.id}
            className={classNames({
              cell: true,
              checked: cell === source || cell === target,
              frog: cell.frog !== null,
              jumpOption: jumpOptions.some(
                (option) => option.x === cell.x && option.y === cell.y
              ),
              disabled:
                source !== null &&
                cell.frog === null &&
                !jumpOptions.some(
                  (option) => option.x === cell.x && option.y === cell.y
                ) &&
                cell !== source,
            })}
            onClick={() => handleCellClick(cell)}
          >
            {cell.frog !== null &&
            cell.frog.height === "short" &&
            cell.frog.thickness === "fat" ? (
              <Frog bodyHeight={50} bodyWidth={50} bellyWidth={40} number={5} />
            ) : cell.frog !== null &&
              cell.frog.height === "short" &&
              cell.frog.thickness === "slim" ? (
              <Frog
                bodyHeight={50}
                bodyWidth={24}
                bellyWidth={18}
                number={20}
              />
            ) : cell.frog !== null &&
              cell.frog.height === "tall" &&
              cell.frog.thickness === "fat" ? (
              <Frog bodyHeight={65} bodyWidth={50} bellyWidth={40} number={5} />
            ) : cell.frog !== null &&
              cell.frog.height === "tall" &&
              cell.frog.thickness === "slim" ? (
              <Frog
                bodyHeight={65}
                bodyWidth={30}
                bellyWidth={20}
                number={15}
              />
            ) : null}
            <p>x: {cell.x}</p>
            <p>y: {cell.y}</p>
            {/* <p>{cell.frog?.gender}</p> */}
            {/* <p>{cell.frog?.height}{cell.frog?.thickness}</p> */}
          </div>
        
  );
}
