import React, { useState } from "react";
import classNames from "classnames";
import "./Grid.css";
import Cell from "./Cell";
import Frog from "./Frog";

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
  //   {
  //     x: 3,
  //     y: 1,
  //     frog: {
  //       gender: "female",
  //       height: "tall",
  //       thickness: "slim",
  //     },
  //   },
];

export default function Grid({ rows, cols }) {
  //   const [cells, setCells] = useState(
  //     Array.from({ length: rows * cols }, (_, index) => {
  //         const x = index % cols;
  //         const y = Math.floor(index / cols);
  //         return({
  //       x,
  //       y,
  //       id: index,
  //       frog: initialFrogs.find((frog) => frog.x === x && frog.y === y) ?? null,
  //     })})
  //   ); coś tu się zagnieździło

  const [cells, setCells] = useState(
    Array.from({ length: rows * cols }, (_, index) => {
      const x = index % cols;
      const y = Math.floor(index / cols);

      const frogData = initialFrogs.find(
        (frog) => frog.x === x && frog.y === y
      );
      const frog = frogData ? { ...frogData.frog } : null;

      return {
        x,
        y,
        id: index,
        frog,
      };
    })
  );

  const [source, setSource] = useState(null); //komórka pierwsza którą klikam
  const [target, setTarget] = useState(null); //druga

  //przechowuje pola do skoku
  const [jumpOptions, setJumpOptions] = useState([]);

  //do przycisków jump i reproduce
  const canJump = source?.frog !== null && target?.frog === null;
  const canReproduce = !!source?.frog && !!target?.frog; // tu zmienić że musi być male i female, mam żabę na jednej i drugiej pozycji

  //heart
  const [heartPosition, setHeartPosition] = useState({ top: 0, left: 0 });

  // const maleJumpCoordinates = [
  //   { dx: 3, dy: 0 },  // w prawo
  //   { dx: -3, dy: 0 }, // w lewo
  //   { dx: 0, dy: 3 },  // w dół
  //   { dx: 0, dy: -3 }, // w górę
  //   { dx: 3, dy: 3 },  // po skosie w prawo w dół
  //   { dx: 3, dy: -3 }, // po skosie w prawo w górę
  //   { dx: -3, dy: 3 }, // po skosie w lewo w dół
  //   { dx: -3, dy: -3 } // po skosie w lewo w górę
  // ];

  // const femaleJumCoordinates = [
  //   { dx: 2, dy: 0 },
  //   { dx: -2, dy: 0 },
  //   { dx: 0, dy: 2 },
  //   { dx: 0, dy: -2 },
  //   { dx: 2, dy: 2 },
  //   { dx: 2, dy: -2 },
  //   { dx: -2, dy: 2 },
  //   { dx: -2, dy: -2 }
  // ];

  // const cellsAroundMotherCoordinates = [
  //   { dx: 1, dy: 0 },  // prawa
  //   { dx: 1, dy: 1 },  // prawy dolny
  //   { dx: 0, dy: 1 },  // dół
  //   { dx: -1, dy: 1 }, // lewy dolny
  //   { dx: -1, dy: 0 }, // lewa
  //   { dx: -1, dy: -1 }, // lewy górny
  //   { dx: 0, dy: -1 },  // góra
  //   { dx: 1, dy: -1 }   // prawy górny
  // ]

  // const getOptions = (cell, rows, cols, cells, coordinates) => {
  //   const options = [];

  //   //czy żaba istnieje w tej komórce
  //   if (cell.frog === null) {
  //     return [];
  //   }

  //   //pozycja startowa żaby
  //   const { x, y } = cell;

  //   coordinates.forEach(({ dx, dy }) => {
  //     const newX = x + dx;
  //     const newY = y + dy;

  //     //czy nowe wsp są w granicach planszy
  //     if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
  //       const targetCell = cells.find((c) => c.x === newX && c.y === newY);

  //     }
  //   })

  //   options.push(avaliableCells)

  // }

  const getValidCoortinates = (x, y, rows, cols) => {
    return x >= 0 && x < cols && y >= 0 && y < rows;
  };

  //opcje do narodzin nowej zaby
  const getCellsAroundMother = (cell, rows, cols) => {
    console.log("Wywołanie getCellsAroundMother dla komórki:", cell);
    const birthOptions = [];
    const adjacentFrogs = [];
    // let validCoordinates = [];

    if (cell.frog && cell.frog.gender === "female") {
      console.log("jest kobieta");

      const neighbors = [
        { x: cell.x + 1, y: cell.y }, //prawa
        { x: cell.x + 1, y: cell.y + 1 }, //prawy dolny
        { x: cell.x, y: cell.y + 1 }, //dół
        { x: cell.x - 1, y: cell.y + 1 }, //lewy dolny
        { x: cell.x - 1, y: cell.y }, //lewy
        { x: cell.x - 1, y: cell.y - 1 }, //lewy górny
        { x: cell.x, y: cell.y - 1 }, // górny
        { x: cell.x + 1, y: cell.y - 1 }, // prawy górny
      ];

      //sąsiadujące współrzędne, aby znaleźć tylko te w granicach planszy
      // validCoordinates = neighbors.filter(({ x, y }) => x >= 0 && x < cols && y >= 0 && y < rows);

      //które są w granicach i maja frog null
      neighbors.forEach(({ x, y }) => {
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          //to ja tu sobie moge jedynie dać getValidCoordinates
          const neighborCell = cells.find((c) => c.x === x && c.y === y);
          if (neighborCell && neighborCell.frog === null) {
            birthOptions.push(neighborCell);
          }
          if (neighborCell && neighborCell.frog) {
            adjacentFrogs.push(neighborCell);
          }
        }
      });
    }
    console.log("Dostępne opcjie narodzin", birthOptions);
    return { birthOptions, adjacentFrogs };
    // return validCoordinates;
  };

  // console.log(canReproduce);
  const handleReproduce = (cells) => {
    if (source === null || target === null) {
      return;
    }

    if (
      (source.frog.gender === "female" && target.frog.gender === "male") ||
      (source.frog.gender === "male" && target.frog.gender === "female")
    ) {
      // Określenie komórki matki
      const motherCell = source.frog.gender === "female" ? source : target;
      const fatherCell = source.frog.gender === "male" ? source : target;

      // Pobranie aktualnych sąsiadujących komórek wokół matki, w tym żab
      const { birthOptions, adjacentFrogs } = getCellsAroundMother(
        motherCell,
        rows,
        cols
      );

      // Sprawdzenie, czy target lub source jest jednym z aktualnych sąsiadów
      const isTargetAdjacent = adjacentFrogs.some(
        (frogCell) =>
          (frogCell.x === target.x && frogCell.y === target.y) ||
          (frogCell.x === source.x && frogCell.y === source.y)
      );
      console.log(adjacentFrogs);
      if (!isTargetAdjacent) {
        console.log(
          "Target nie jest w sąsiedztwie matki i nie może być wybrany."
        );
        return;
      }

      // Określenie rodziców
      const motherFrog = motherCell.frog;
      const fatherFrog = fatherCell.frog;

      // Losowanie płci dla nowej żaby
      const randomGender = Math.random() < 0.5 ? "male" : "female";

      // Jeśli jest wolne miejsce, bierzemy pierwsze z listy birthOptions i tam dodajemy nową żabę
      if (birthOptions.length > 0) {
        const newFrogCell = birthOptions[0];

        // Dziedziczenie height
        const childHeight =
          motherFrog.height === fatherFrog.height
            ? motherFrog.height
            : Math.random() < 0.5
            ? motherFrog.height
            : fatherFrog.height;

        // Dziedziczenie thickness
        const childThickness =
          motherFrog.thickness === fatherFrog.thickness
            ? motherFrog.thickness
            : Math.random() < 0.5
            ? motherFrog.thickness
            : fatherFrog.thickness;

        // Aktualizacja stanu żab
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

        console.log("Nowa żaba w komórce:", newFrogCell);
      } else {
        console.log("Brak wolnych miejsc wokół matki");
      }
    } else {
      console.log(
        "Reprodukcja jest możliwa tylko pomiędzy męską a żeńską żabą :)"
      );
    }

    // pozycja serca
    const centerX = (source.x + target.x) / 2;
    const centerY = (source.y + target.y) / 2;

    // Przeskalowanie na piksele
    setHeartPosition({
      top: centerY * 80,
      left: centerX * 80,
    });

    setSource(null);
    setTarget(null);
    setJumpOptions([]);
    showHeart();
  };

  //opcje do skoku
  const getJumpOptions = (cell, rows, cols) => {
    console.log("Wywołanie getJumpOptions dla komórki:", cell);
    const options = [];

    if (!cell.frog) {
      console.log("Brak żaby w tej komórce.");
      return options;
    }

    const { x, y } = cell;
    const jumpDistance = cell.frog.gender === "male" ? 3 : 2; // Skok o 3 pola dla "male" i 2 pola dla "female"

    // Dodajemy opcje skoków zależne od płci
    options.push(
      { x: x, y: y + jumpDistance }, // w dół
      { x: x, y: y - jumpDistance }, // w górę
      { x: x + jumpDistance, y: y + jumpDistance }, // po skosie w prawo w dół
      { x: x + jumpDistance, y: y - jumpDistance }, // po skosie w prawo w górę
      { x: x - jumpDistance, y: y + jumpDistance }, // po skosie w lewo w dół
      { x: x - jumpDistance, y: y - jumpDistance }, // po skosie w lewo w górę
      { x: x + jumpDistance, y: y }, // w prawo
      { x: x - jumpDistance, y: y } // w lewo
    );

    // console.log(cols);

    // Filtrowanie, aby sprawdzić, czy skok mieści się w granicach planszy
    return options.filter(
      ({ x, y }) => x >= 0 && x < cols && y >= 0 && y < rows
    );
  };

  const handleCellClick = (cell) => {
    console.log("Kliknięto na komórkę:", cell); // Log komórki, na którą kliknięto

    if (source === null) {
      if (cell.frog === null) {
        console.log("Kliknięto pustą komórkę, musisz kliknąć żabę");
        return;
      }

      setSource(cell);
      const availableJumps = getJumpOptions(cell, rows, cols);
      setJumpOptions(availableJumps);
      console.log("Dostępne skoki po kliknięciu na żabę:", availableJumps);
      return;
    } else {
      if (source === cell) {
        setSource(null);
        setTarget(null);
        setJumpOptions([]);
        return;
      }

      if (target === null) {
        if (cell.frog === null) {
          setTarget(cell);
          return;
        } else {
          // console.log("Kliknięto inną komórkę z żabą")
          setTarget(cell);
          return;
        }
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

  //reprodukcja
  //jeśli target jest żabą i source jest żabą to kliknij btn reproduce i dodaj nową żabę
  //określenie wolnego pola obok matki

  // const avaliableCellNextToMother =

  // console.log(cells);

  //animacja serca
  const [isHeartAnimation, setIsHeartAnimation] = useState(false);

  const showHeart = () => {
    setIsHeartAnimation(true);

    setTimeout(() => {
      setIsHeartAnimation(false);
    }, 3000);
  };

  return (
    <div>
      <div className="siatkaTest">
        <div
          className={`heart ${isHeartAnimation ? "animate" : ""}`}
          style={{
            top: `${heartPosition.top + 20}px`,
            left: `${heartPosition.left + 20}px`,
            position: "absolute",
            // transform: 'translate(-80%, -50%)',
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
      <div>
        <button disabled={!canJump} onClick={setNewCellOfFrog} >
          Jump
        </button>
        <button disabled={!canReproduce} onClick={handleReproduce}>
          Reproduce
        </button>
      </div>
    </div>
  );
}

//wykluczyć pozycje z żab z opcji skoku
// wyłączyć pointer eventy dla żab które są dalej niż 1 od mojej klikniętej żaby
// wyciągnąć jedną funckję z dwóch tych z options
//get surrounding positions - zwrócic tablice wspołrzednych , wsp jako argumenty + dystans,
//osobny komponent dla komórki

//!!!!! 172

// {cells.map((cell) => (
//           <div
//             key={cell.id}
//             className={classNames({
//               cell: true,
//               checked: cell === source || cell === target,
//               frog: cell.frog !== null,
//               jumpOption: jumpOptions.some(
//                 (option) => option.x === cell.x && option.y === cell.y
//               ),
//               disabled:
//                 source !== null &&
//                 cell.frog === null &&
//                 !jumpOptions.some(
//                   (option) => option.x === cell.x && option.y === cell.y
//                 ) &&
//                 cell !== source,
//             })}
//             onClick={() => handleCellClick(cell)}
//           >
//             {cell.frog !== null &&
//             cell.frog.height === "short" &&
//             cell.frog.thickness === "fat" ? (
//               <Frog bodyHeight={50} bodyWidth={50} bellyWidth={40} number={5} />
//             ) : cell.frog !== null &&
//               cell.frog.height === "short" &&
//               cell.frog.thickness === "slim" ? (
//               <Frog
//                 bodyHeight={50}
//                 bodyWidth={24}
//                 bellyWidth={18}
//                 number={20}
//               />
//             ) : cell.frog !== null &&
//               cell.frog.height === "tall" &&
//               cell.frog.thickness === "fat" ? (
//               <Frog bodyHeight={65} bodyWidth={50} bellyWidth={40} number={5} />
//             ) : cell.frog !== null &&
//               cell.frog.height === "tall" &&
//               cell.frog.thickness === "slim" ? (
//               <Frog
//                 bodyHeight={65}
//                 bodyWidth={30}
//                 bellyWidth={20}
//                 number={15}
//               />
//             ) : null}
//             <p>x: {cell.x}</p>
//             <p>y: {cell.y}</p>
//             {/* <p>{cell.frog?.gender}</p> */}
//             {/* <p>{cell.frog?.height}{cell.frog?.thickness}</p> */}
//           </div>
//         ))}
