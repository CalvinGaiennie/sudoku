import { useState, useEffect } from "react";
import styles from "./Board.module.css";

const createEmptyBoard = () => {
  return Array(9)
    .fill()
    .map(() =>
      Array(9)
        .fill()
        .map(() => ({ value: 0 }))
    );
};

const board = createEmptyBoard();

function fillBoard(board) {
  function findEmptySquare(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col].value === 0) {
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
        board[row][col].value = num;

        if (solve(board)) {
          return true;
        }
        board[row][col].value = 0;
      }
    }
    return false;
  }
  solve(board);
  return board;
}

function checkIsValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i].value === num || board[i][col].value === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j].value === num) {
        return false;
      }
    }
  }
  return true;
}

function assignBorderClass(row, column) {
  const borderStyles = [];
  if (row === 0 || row === 3 || row === 6) {
    borderStyles.push(styles.topBorder);
  } else if (row === 8) {
    borderStyles.push(styles.bottomBorder);
  }
  if (column === 0 || column === 3 || column === 6) {
    borderStyles.push(styles.leftBorder);
  } else if (column === 8) {
    borderStyles.push(styles.rightBorder);
  }
  return borderStyles.join(" ");
}

function Board() {
  const [gameBoard, setgameBoard] = useState([...board]);
  const [selectedSquare, setSelectedSquare] = useState(null);

  useEffect(() => {
    const newBoard = JSON.parse(JSON.stringify(board));
    fillBoard(newBoard);
    setgameBoard(newBoard);
  }, []);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function handleSquareClick(outerIndex, innerIndex) {
    setSelectedSquare({ row: outerIndex, col: innerIndex });
  }

  function guess(number) {
    if (
      selectedSquare &&
      gameBoard[selectedSquare.row][selectedSquare.col].value === number
    ) {
      console.log("correct");
    } else {
      console.log("incorrect");
    }
  }

  function createGrid() {
    return gameBoard.map((row, outerIndex) => (
      <div key={`${outerIndex}-a`} className={`${styles.row}`}>
        {row.map((square, innerIndex) => {
          const isSelected =
            selectedSquare &&
            selectedSquare.row === outerIndex &&
            selectedSquare.col === innerIndex;

          const borderClass = assignBorderClass(outerIndex, innerIndex);

          return (
            <button
              key={`${outerIndex}-${innerIndex}`}
              className={`${styles.square} ${borderClass} ${
                isSelected ? styles.selectedSquare : ""
              }`}
              onClick={() => handleSquareClick(outerIndex, innerIndex)}
            >
              {square.value !== 0 ? square.value : ""}
            </button>
          );
        })}
      </div>
    ));
  }

  return (
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
  );
}

export default Board;
