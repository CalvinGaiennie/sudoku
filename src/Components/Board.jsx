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

function fillBoard(board) {
  function findEmptyCell(board) {
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
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
      return true;
    }

    const { row, col } = emptyCell;

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
    return true;
  }
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
  function createGrid() {
    return Array.from({ length: 9 }).map((_, outerIndex) => (
      <div
        key={`${outerIndex}-a`}
        className={`${styles.row} ${`row${outerIndex}`}`}
      >
        {Array.from({ length: 9 }).map((_, innerIndex) => (
          <div
            key={`${outerIndex}-${innerIndex}`}
            className={` ${
              styles.square
            } ${`column${innerIndex}`} ${assignBorderClass(
              outerIndex,
              innerIndex
            )}`}
          ></div>
        ))}
      </div>
    ));
  }
  return (
    <div className={styles.boardContainer}>
      {createGrid()}
      <button onClick={() => fillBoard(board)}>hey</button>
      <button onClick={() => console.log(board, "hey")}>Ho</button>
    </div>
  );
}

export default Board;
