import { useState, useEffect, useRef } from "react";
import styles from "./Board.module.css";
import { createEmptyBoard, fillBoard } from "../utils/boardUtils.js";
import { handleGuess, createGridElements } from "../utils/gameUtils.jsx";
import { checkForWin } from "../utils/gameUtils.jsx";

function Board() {
  const [gameBoard, setGameBoard] = useState(createEmptyBoard());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const squaresToHideRef = useRef(null);

  function newGame() {
    const newBoard = createEmptyBoard();
    fillBoard(newBoard, parseInt(squaresToHideRef.current.value));
    setGameBoard(newBoard);
  }
  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (checkForWin(gameBoard)) {
      console.log("You win!");
    }
  }, [gameBoard]);

  useEffect(() => {
    function handleKeyPress(event) {
      const num = parseInt(event.key);
      if (num >= 1 && num <= 9) {
        const newBoard = handleGuess(gameBoard, selectedSquare, num);
        setGameBoard(newBoard);
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [selectedSquare, gameBoard]);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function handleSquareClick(outerIndex, innerIndex) {
    setSelectedSquare({ row: outerIndex, col: innerIndex });
  }

  function guess(number) {
    const newBoard = handleGuess(gameBoard, selectedSquare, number);
    setGameBoard(newBoard);
  }

  return (
    <div>
      <div className={styles.boardContainer}>
        <div>
          {createGridElements(
            gameBoard,
            selectedSquare,
            styles,
            handleSquareClick
          )}
        </div>
        <div>
          {numbers.map((number) => (
            <button
              key={number}
              className={styles.guess}
              onClick={() => guess(number)}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      <div>
        <select ref={squaresToHideRef}>
          <option value="20">Easy</option>
          <option value="35">Medium</option>
          <option value="50">Hard</option>
        </select>
        <button onClick={() => newGame()}>New Game</button>
      </div>
      {/* <div>{JSON.stringify(gameBoard)}</div> */}
    </div>
  );
}

export default Board;
