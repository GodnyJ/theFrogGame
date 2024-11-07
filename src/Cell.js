import React from "react";
import classNames from "classnames";
import "./Cell.css";
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
      {cell.frog !== null ? (
        <Frog
          height={cell.frog.height}
          thickness={cell.frog.thickness}
          gender={cell.frog.gender}
        />
      ) : null}
    </div>
  );
}