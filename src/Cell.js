import React, { useState } from "react";
import classNames from 'classnames';
import "./cell.css";

const initialFrogs = [
  {
    x: 5,
    y: 3,
    frog: {
      gender: "male",
      height: "tall",
      thickness: "slim",
    },
  },
  {
    x: 1,
    y: 1,
    frog: {
      gender: "female",
      height: "tall",
      thickness: "slim",
    },
  },
  {
    x: 3,
    y: 1,
    frog: {
      gender: "female",
      height: "tall",
      thickness: "slim",
    },
  },
];

export default function Cell({ rows, cols }) {
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

      const frogData = initialFrogs.find((frog) => frog.x === x && frog.y === y);
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

  const canJump = source?.frog !== null && target?.frog === null;
  const canReproduce = source?.frog !== null && target?.frog !== null; //mam żabę na jednej i drugiej pozycji

  const getJumpOptions = (cell, rows, cols) => {
    console.log("Wywołanie getJumpOptions dla komórki:", cell); 
    const options = []; 

    if (!cell.frog) {
        console.log("Brak żaby w tej komórce.");
        return options;
    }

    const { x, y } = cell;
    const jumpDistance = cell.frog.gender === "male" ? 3 : 2;  // Skok o 3 pola dla "male" i 2 pola dla "female"

    // Dodajemy opcje skoków zależne od płci
    options.push(
        { x: x, y: y + jumpDistance }, // w dół
        { x: x, y: y - jumpDistance }, // w górę
        { x: x + jumpDistance, y: y + jumpDistance },  // po skosie w prawo w dół
        { x: x + jumpDistance, y: y - jumpDistance },  // po skosie w prawo w górę
        { x: x - jumpDistance, y: y + jumpDistance },  // po skosie w lewo w dół
        { x: x - jumpDistance, y: y - jumpDistance },  // po skosie w lewo w górę
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
                console.log("Kliknięto inną komórkę z żabą");
                setTarget(cell);
                return;
            }
        }
    }
};
console.log({source});
console.log({target});

//nowa pozycja żaby
const setNewCellOfFrog = () => {
    setCells((oldCells) => 
        oldCells.map((cell) => {
            //jeśli komórka jest źródłem (source) tp ustawiam ją jako pustą
            if (cell.x === source?.x && cell.y === source?.y) {
                return { ...cell, frog: null };
            }
            //jeśli komórka jest celem (target) to przenoszę do niej żabę i ustawiam nowe współrzędne
            if (cell.x === target?.x && cell.y === target?.y) {
                return { ...cell, frog: source?.frog, x: target.x, y: target.y };
            }
            return cell;
        })
    )

    setSource(null);
    setTarget(null);
    setJumpOptions([]);
}

// console.log(cells);
  return (
    <div>
        <div className="siatkaTest">
            {cells.map((cell) => (
            <div
                key={cell.id}
                className={classNames({
                cell: true,
                checked: cell === source || cell === target,
                frog: cell.frog !== null,
                jumpOption: jumpOptions.some((option) => option.x === cell.x && option.y === cell.y),
                disabled: source !== null && cell.frog === null && !jumpOptions.some((option) => option.x === cell.x && option.y ===cell.y) && cell !== source,
            })}
                onClick={() => handleCellClick(cell)} 
            >
                <p>x: {cell.x}</p>
                <p>y: {cell.y}</p>
            </div>
            ))}
        </div>
        <div>
        <button onClick={setNewCellOfFrog}>Jump</button>
        <button>Reproduce</button>
        </div>
    </div>
  );
}
