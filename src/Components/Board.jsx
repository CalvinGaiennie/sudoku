import { useState, useEffect, useRef } from "react";
import styles from "./Board.module.css";
import { createEmptyBoard, fillBoard } from "../utils/boardUtils.js";
import { assignBorderClass } from "../utils/styleUtils.js";

function Board() {
  const [gameBoard, setGameBoard] = useState(createEmptyBoard());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const squaresToHideRef = useRef(null);

  //create a fill a new sudoku board
  useEffect(() => {
    const newBoard = createEmptyBoard();
    fillBoard(newBoard, parseInt(squaresToHideRef.current.value));
    setGameBoard(newBoard);
  }, []);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function handleSquareClick(outerIndex, innerIndex) {
    setSelectedSquare({ row: outerIndex, col: innerIndex });
  }

  function guess(number) {
    // Check to make sure the square is selected and not hidden
    if (
      !selectedSquare ||
      !gameBoard[selectedSquare.row][selectedSquare.col].hidden
    ) {
      return;
    }

    //Create a copy of the board with the new guess and add it to the state as the new board
    const newBoard = JSON.parse(JSON.stringify(gameBoard));
    newBoard[selectedSquare.row][selectedSquare.col].value = number;
    setGameBoard(newBoard);
  }

  //Create the actual html elements for the board using the gameboard state to assign the values and classes
  function createGrid() {
    return gameBoard.map((row, outerIndex) => (
      <div key={`${outerIndex}-a`} className={`${styles.row}`}>
        {row.map((square, innerIndex) => {
          const isSelected =
            selectedSquare &&
            selectedSquare.row === outerIndex &&
            selectedSquare.col === innerIndex;

          const borderClass = assignBorderClass(outerIndex, innerIndex, styles);

          return (
            <button
              key={`${outerIndex}-${innerIndex}`}
              className={`${styles.square} ${borderClass} ${
                isSelected ? styles.selectedSquare : ""
              }`}
              onClick={() => handleSquareClick(outerIndex, innerIndex)}
            >
              {!square.hidden ? square.value : square.value === 0 ? "" : ""}
            </button>
          );
        })}
      </div>
    ));
  }

  return (
    <div>
      <div className={styles.boardContainer}>
        {createGrid()}
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
      </div>
    </div>
  );
}

export default Board;
