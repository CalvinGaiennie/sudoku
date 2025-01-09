import { useState, useEffect } from "react";
import styles from "./Board.module.css";

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function guess(number) {
  if (number == "a") {
    return true;
  } else {
    return false;
  }
}

function fillBoard(board) {
  function findEmptySquare(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return { row, col };
        }
      }
    }
    return null;
  }

  function solve(board) {
    const emptySquare = findEmptySquare(board);
    if (!emptySquare) {
      return true;
    }

    const { row, col } = emptySquare;

    for (let num = 1; num <= 9; num++) {
      if (checkIsValid(board, row, col, num)) {
        board[row][col] = num;

        if (solve(board)) {
          return true;
        }
        board[row][col] = 0;
      }
    }
    return false;
  }
  solve(board);
  return board;
}

function checkIsValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }
  return true;
}

function assignBorderClass(row, column) {
  const borderStyles = [];
  if (row == 0 || row == 3 || row == 6) {
    borderStyles.push(styles.topBorder);
  } else if (row == 8) {
    borderStyles.push(styles.bottomBorder);
  }
  if (column == 0 || column == 3 || column == 6) {
    borderStyles.push(styles.leftBorder);
  } else if (column == 8) {
    borderStyles.push(styles.rightBorder);
  }
  return borderStyles.join(" ");
}

function Board() {
  const [gameBoard, setgameBoard] = useState([...board]);

  const numbers = Array.from({ length: 9 }, (_, i) => i + 1);

  useEffect(() => {
    const newBoard = [...board];
    fillBoard(newBoard);
    setgameBoard(newBoard);
  }, []);

  function createGrid() {
    return gameBoard.map((row, outerIndex) => (
      <div
        key={`${outerIndex}-a`}
        className={`${styles.row} ${`row${outerIndex}`}`}
      >
        {row.map((square, innerIndex) => (
          <button
            key={`${outerIndex}-${innerIndex}`}
            className={` ${
              styles.square
            } ${`r${outerIndex}-c${innerIndex}`} ${assignBorderClass(
              outerIndex,
              innerIndex
            )}`}
            data-value={square}
            onClick={() => console.log(square)}
          >
            {square !== 0 ? square : ""}
          </button>
        ))}
      </div>
    ));
  }
  return (
    <div className={styles.boardContainer}>
      {createGrid()}
      <div>
        {numbers.map((number) => (
          <button key={number} className={styles.guess} onClick={guess(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Board;
