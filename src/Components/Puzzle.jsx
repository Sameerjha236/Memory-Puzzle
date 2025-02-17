import { useRef, useState } from "react";

const intialStatePuzzle = [
  ["w", "x", "y", "z", "w"],
  ["x", "y", "z", "w", "x"],
  ["y", "z", "w", "x", "y"],
  ["z", "w", "x", "y", "z"],
  ["w", "x", "y", "z", "o"],
];

const intialStateStatus = Array.from({ length: 5 }, () => Array(5).fill(false));

const Puzzle = () => {
  const [puzzle, setPuzzle] = useState(intialStatePuzzle);
  const [status, setStatus] = useState(intialStateStatus);
  const [turn, setTurn] = useState(1);
  const [win, setWin] = useState(false);
  const [loading, setLoading] = useState(false);
  const previous = useRef({});

  const checkEqual = (r, c) => {
    const curr = puzzle[r][c];
    const prev = puzzle[previous.current.r][previous.current.c];

    console.log({ prev, curr }, prev === curr);

    if (prev === curr) {
      setTurn((curr) => curr + 1);
      previous.current = {};
    } else {
      setTurn((curr) => curr - 1);
      var temStatus = [...status];
      temStatus[r][c] = false;
      temStatus[previous.current.r][previous.current.c] = false;
    }
  };

  const toggleHandler = (r, c) => {
    if (loading) return;
    var tempStatus = [...status];
    tempStatus[r][c] = true;
    setStatus(tempStatus);
    if (turn === 26) {
      setWin(true);
      return;
    }

    if (turn % 2 === 1) {
      setTurn((curr) => curr + 1);
      previous.current.r = r;
      previous.current.c = c;
    } else {
      setLoading(true);
      setTimeout(() => {
        checkEqual(r, c);
        setLoading(false);
      }, [1000]);
    }
  };

  return (
    <>
      {win && <h3>You Win</h3>}
      <div className="PuzzleWrapper">
        {puzzle.map((row, r) => {
          return (
            <div key={r}>
              {row.map((col, c) => {
                return (
                  <p
                    className="cell"
                    key={c}
                    onClick={() => toggleHandler(r, c)}
                  >
                    {status[r][c] ? col : "H"}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          setPuzzle([...intialStatePuzzle]);
          setStatus([...intialStateStatus]);
          setWin(false);
          setTurn(1);
        }}
      >
        Reset
      </button>
    </>
  );
};

export default Puzzle;
