import { useRef, useState } from "react";
import apple from "../assets/apple.svg";
import carrot from "../assets/carrot.svg";
import grape from "../assets/grape.svg";
import lemon from "../assets/lemon.svg";
import joker from "../assets/joker.svg";
import { creteIntialState } from "../utils/CreatePuzzle";

const intialStateStatus = Array.from({ length: 5 }, () => Array(5).fill(false));

const Puzzle = () => {
  const [puzzle, setPuzzle] = useState(creteIntialState);
  const [status, setStatus] = useState(intialStateStatus);
  const [turn, setTurn] = useState(1);
  const [win, setWin] = useState(false);
  const [loading, setLoading] = useState(false);
  const previous = useRef({});

  const checkEqual = (r, c) => {
    const curr = puzzle[r][c];
    const prev = puzzle[previous.current.r][previous.current.c];

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
    if (status[r][c]) return;
    var tempStatus = [...status];
    tempStatus[r][c] = true;
    if (turn === 25) {
      setWin(true);
      setStatus(tempStatus);
      return;
    }
    setStatus(tempStatus);
    if (puzzle[r][c] === "o") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        tempStatus[r][c] = false;
        setStatus(tempStatus);
      }, [500]);
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

  // eslint-disable-next-line react/prop-types
  const ImageRender = ({ val }) => {
    switch (val) {
      case "w":
        return <img className="cellImage" src={apple} alt="W" />;
      case "x":
        return <img className="cellImage" src={lemon} alt="X" />;
      case "y":
        return <img className="cellImage" src={grape} alt="Y" />;
      case "z":
        return <img className="cellImage" src={carrot} alt="Z" />;
      case "o":
        return <img className="cellImage" src={joker} alt="Z" />;
      default:
        return null;
    }
  };

  return (
    <>
      {win && <h3>You Win</h3>}
      <div className="PuzzleWrapper">
        {puzzle.map((row, r) => {
          return (
            <div key={r}>
              {row.map((val, c) => {
                return (
                  <p
                    className={`cell ${
                      status[r][c] ? "flipped" : "notFlipped"
                    }`}
                    key={c}
                    onClick={() => toggleHandler(r, c)}
                  >
                    {status[r][c] ? <ImageRender val={val} /> : ""}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          const intialState = creteIntialState();
          setPuzzle([...intialState]);
          setStatus([...intialStateStatus]);
          setWin(false);
          setTurn(1);
          setLoading(false);
          previous.current = {};
        }}
        className="ResetBtn"
      >
        Reset
      </button>
    </>
  );
};

export default Puzzle;
