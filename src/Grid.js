import React, { useState } from "react";
import "./Grid.css";
import Cell from "./Cell";

const rows = 6;
const cols = 10;

const jumpDistances = {
  male: 3,
  female: 2,
};

const reproductionDistance = 1;

const initialFrogs = [
  {
    x: 0,
    y: 0,
    frog: {
      gender: "female",
      height: "tall",
      thickness: "slim",
    },
  },
  {
    x: 0,
    y: 1,
    frog: {
      gender: "male",
      height: "short",
      thickness: "fat",
    },
  },
];

const initialCells = Array.from({ length: rows * cols }, (_, index) => {
  const x = index % cols;
  const y = Math.floor(index / cols);

  const frogData = initialFrogs.find((frog) => frog.x === x && frog.y === y);
  const frog = frogData ? { ...frogData.frog } : null;

  return {
    x,
    y,
    id: index,
    frog,
  };
});

const getAvailablePositions = (x, y, distance) => {
  return [
    { x: x - distance, y: y - distance },
    { x, y: y - distance },
    { x: x + distance, y: y - distance },
    { x: x - distance, y },
    { x: x + distance, y },
    { x: x - distance, y: y + distance },
    { x, y: y + distance },
    { x: x + distance, y: y + distance },
  ].filter((pos) => pos.x >= 0 && pos.x < cols && pos.y >= 0 && pos.y < rows);
};

export default function Grid() {
  const [cells, setCells] = useState(initialCells);

  const [source, setSource] = useState(null); //cell clicked first
  const [target, setTarget] = useState(null); //cell clicked second

  //array of cells to jump
  const [jumpOptions, setJumpOptions] = useState([]);
  // message for player
  const [message, setMessage] = useState(
    "If you want to make a different move, click again on the frog selected first"
  );

  //heart animation - after reproduce
  const [heartPosition, setHeartPosition] = useState({ top: 0, left: 0 });
  const [isHeartAnimation, setIsHeartAnimation] = useState(false);

  const showHeart = () => {
    setIsHeartAnimation(true);

    setTimeout(() => {
      setIsHeartAnimation(false);
    }, 3000);
  };

  //I check if the buttons Jump and Reproduce should be available
  const canJump = source?.frog !== null && target?.frog === null;
  const canReproduce =
    !!source?.frog &&
    !!target?.frog &&
    ((source.frog.gender === "male" && target.frog.gender === "female") ||
      (source.frog.gender === "female" && target.frog.gender === "male"));

  //get available positions to jump
  const getJumpOptions = (cell) => {
    if (!cell.frog) {
      console.log("Brak żaby w tej komórce.");
      return [];
    }

    return getAvailablePositions(
      cell.x,
      cell.y,
      jumpDistances[cell.frog.gender]
    );
  };

  //get cells for Child Frog
  const getBirthOptions = (cell) => {
    if (cell.frog === null) {
      return [];
    }
    const birthOptions = [];
    const neighbors = getAvailablePositions(
      cell.x,
      cell.y,
      reproductionDistance
    );
    neighbors.forEach(({ x, y }) => {
      //I check which cell in cells has this position
      const neighborCell = cells.find((c) => c.x === x && c.y === y);
      //if the adjacent cell is not a Frog
      if (neighborCell && neighborCell.frog === null) {
        birthOptions.push(neighborCell);
      }
    });
    return birthOptions;
  };

  // get cells of adjacent Frogs
  const getAdjacentFrogs = (cell) => {
    if (cell.frog === null) {
      return [];
    }
    const adjacentFrogs = [];
    const neighbors = getAvailablePositions(
      cell.x,
      cell.y,
      reproductionDistance
    );
    neighbors.forEach(({ x, y }) => {
      //I check which cell in cells has this position
      const neighborCell = cells.find((c) => c.x === x && c.y === y);
      //if the adjacent cell is a Frog
      if (neighborCell && neighborCell.frog) {
        adjacentFrogs.push(neighborCell);
      }
    });
    return adjacentFrogs;
  };

  const handleReproduce = () => {
    if (source === null || target === null) {
      return;
    }

    if ((source.frog.gender === "female" && target.frog.gender === "male") ||
      (source.frog.gender === "male" && target.frog.gender === "female")) {
      
      const motherCell = source.frog.gender === "female" ? source : target;
      const fatherCell = source.frog.gender === "male" ? source : target;

      const birthOptions = getBirthOptions(motherCell);
      const adjacentFrogs = getAdjacentFrogs(source);

      // I check if target or source is one of the adjacent Frog
      const isTargetAdjacent = adjacentFrogs.some(
        (frogCell) =>
          (frogCell.x === target.x && frogCell.y === target.y) ||
          (frogCell.x === source.x && frogCell.y === source.y)
      );

      if (!isTargetAdjacent) {
        return;
      }

      // for determine the characteristics of the parents
      const motherFrog = motherCell.frog;
      const fatherFrog = fatherCell.frog;

      // random gender for new Frog
      const randomGender = Math.random() < 0.5 ? "male" : "female";

      // If there is empty cell next to the mother, take first from the list and add there new Frog
      if (birthOptions.length > 0) {
        const newFrogCell = birthOptions[0];

        // random height for new Frog
        const childHeight =
          motherFrog.height === fatherFrog.height
            ? motherFrog.height
            : Math.random() < 0.5
            ? motherFrog.height
            : fatherFrog.height;

        // random thickness for new Frog
        const childThickness =
          motherFrog.thickness === fatherFrog.thickness
            ? motherFrog.thickness
            : Math.random() < 0.5
            ? motherFrog.thickness
            : fatherFrog.thickness;

        // update positions of frogs 
        setCells((oldCells) =>
          oldCells.map((cell) =>
            cell.x === newFrogCell.x && cell.y === newFrogCell.y
              ? {
                ...cell,
                frog: {
                  gender: randomGender,
                  height: childHeight,
                  thickness: childThickness,
                },
              }
              : cell
          )
        );
      } else {
        setMessage(
          "For the Child Frog to appear, there must be an empty field next to the Female Frog"
        );
      }
    };

    // heart position
    const centerX = (source.x + target.x) / 2;
    const centerY = (source.y + target.y) / 2;

    // change for px
    setHeartPosition({
      top: centerY * 80,
      left: centerX * 80,
    });

    setSource(null);
    setTarget(null);
    setJumpOptions([]);
    showHeart();
  };

  const handleCellClick = (cell) => {
    // console.log("Kliknięto na komórkę:", cell);

    if (source === null) {
      if (cell.frog === null) {
        console.log("Kliknięto pustą komórkę, musisz kliknąć żabę");
        return;
      }

      setSource(cell);
      const availableJumps = getJumpOptions(cell);
      setJumpOptions(availableJumps);
      console.log("Dostępne skoki po kliknięciu na żabę:", availableJumps);

      // const oppositeGender = getAdjacentFrogs(cell).filter((frog) => frog.gender !== cell.frog.gender);
      // console.log("oppositeGender", oppositeGender);
      return;
    } else {
      if (source === cell) {
        setSource(null);
        setTarget(null);
        setJumpOptions([]);
        return;
      }
      if (target === null) {
        setTarget(cell);
        return;
      }
    }
  };
  console.log({ source });
  console.log({ target });

  //nowa pozycja żaby
  const setNewCellOfFrog = () => {
    if (source === null || target === null) {
      return;
    }
    setCells((oldCells) =>
      oldCells.map((cell) => {
        //jeśli komórka jest źródłem (source) to ustawiam ją jako pustą
        if (cell.x === source?.x && cell.y === source?.y) {
          return { ...cell, frog: null };
        }
        //jeśli komórka jest celem (target) to przenoszę do niej żabę i ustawiam nowe współrzędne
        if (cell.x === target?.x && cell.y === target?.y) {
          return { ...cell, frog: source?.frog, x: target.x, y: target.y };
        }
        return cell;
      })
    );

    setSource(null);
    setTarget(null);
    setJumpOptions([]);
  };

  return (
    <div>
      <div className="siatkaTest">
        <div
          className={`heart ${isHeartAnimation ? "animate" : ""}`}
          style={{
            top: `${heartPosition.top + 20}px`,
            left: `${heartPosition.left + 20}px`,
          }}
        ></div>

        {cells.map((cell) => (
          <Cell
            key={cell.id}
            cell={cell}
            source={source}
            target={target}
            jumpOptions={jumpOptions}
            handleCellClick={handleCellClick}
          />
        ))}
      </div>
      <p>{message}</p>
      <div>
        <button disabled={!canJump} onClick={setNewCellOfFrog}>
          Jump
        </button>
        <button disabled={!canReproduce} onClick={handleReproduce}>
          Reproduce
        </button>
      </div>
    </div>
  );
}

//ostylować buttony
//dokończyć zmianę języka komentarzy
//ustawić ikonę i tytuł strony
//dopisac legendę i opis gry
//policzki dla żaby w legendzie 