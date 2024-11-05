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
  const canReproduce = source?.frog !== null && target?.frog !== null; // tu zmienić że musi być male i female, mam żabę na jednej i drugiej pozycji

//opcje do narodzin nowej zaby
  const getBirthOption = (cell, rows, cols) => {
    console.log("Wywołanie getBirthOption dla komórki:", cell); 
    const birthOptions = [];

    if (cell.frog && cell.frog.gender === 'female') {
        console.log('jest kobieta');
        //sprawdź które komórki o 1 obok mają frog null i dodaj je do tablicy birthOptions
        //dla female na pozycji x:3y:1 komórki dookoła, które muszę sprawdzić to x4y1, x4y2, x3y2, x2y2, x2y1, x2y0, x3y0, x4y0

        const neighbors = [
            {x: cell.x +1, y:cell.y}, //prawa
            {x: cell.x +1, y:cell.y +1}, //prawy dolny
            {x: cell.x, y:cell.y +1}, //dół
            {x: cell.x -1, y:cell.y +1}, //lewy dolny
            {x: cell.x -1, y:cell.y}, //lewy 
            {x: cell.x -1, y:cell.y -1}, //lewy górny 
            {x: cell.x, y:cell.y -1}, // górny 
            {x: cell.x +1, y:cell.y -1}, // prawy górny 
        ];

        //które są w granicach i maja frog null
        neighbors.forEach(({x, y}) => {
            if (x >= 0 && x < cols && y >= 0 && y < rows) {
                const neighborCell = cells.find(c => c.x === x && c.y === y);
                if (neighborCell && neighborCell.frog === null) {
                    birthOptions.push(neighborCell)
                }
            }
        });
    }
    console.log('Dostępne opcjie narodzin', birthOptions);
   return birthOptions;
  }

  const handleReproduce = () => {
    if (
        (source.frog.gender === "female" && target.frog.gender === "male") ||
        (source.frog.gender === "male" && target.frog.gender === "female") 
    ) {
        //żeńska żaba
        const motherCell = source.frog.gender === "female" ? source : target;

        //szukam wolnych miejsc wokół matki
        const birthOptions = getBirthOption(motherCell, rows, cols);

        //jeśli jest wolne miejsce, biorę pierwsze z listy i dodaję tam nową żabę
        if (birthOptions.length > 0) {
            const newFrogCell = birthOptions[0]; 

            setCells((oldCells) => 
                oldCells.map((cell) => 
                    cell.x === newFrogCell.x && cell.y === newFrogCell.y
                        ? {...cell, frog: {gender: "female", height: "small", thickness: "slim"}}
                        : cell
                )
            );

            console.log("Nowa żaba w komórce:", newFrogCell);
        } else {
            console.log("Brak wolnych miejsc wokół matki");
        }
    } else {
        console.log("Reprodukcja jest możliwa tylko pomiędzy męską a żeńską żabą :)");
    }

    setSource(null);
    setTarget(null);
    setJumpOptions([]);
  }

//opcje do skoku
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

//reprodukcja 
//jeśli target jest żabą i source jest żabą to kliknij btn reproduce i dodaj nową żabę 
//określenie wolnego pola obok matki 

// const avaliableCellNextToMother = 


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
        <button 
        // className={classNames({
        //     // displayNone,
        //     displayReproduce: (target?.frog.gender === 'male' && source?.frog.gender === 'female') || (target?.frog.gender === 'female' && source?.frog.gender === 'male'),
        // })}
            onClick={handleReproduce}
        >Reproduce</button>
        </div>
    </div>
  );
}
