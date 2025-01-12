import { checkIsValid } from "./validationUtils";

//Create an empty board
export const createEmptyBoard = () => {
  return Array(9)
    .fill()
    .map(() =>
      Array(9)
        .fill()
        .map(() => ({ value: 0, hidden: false, correct: true }))
    );
};

export function fillBoard(board, squaresToHide) {
  //Find the first empty square in the board
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
      //Check if the current index is a valid choice for the empty square
      if (checkIsValid(board, row, col, num)) {
        //If it is then set it
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

  let hiddenCount = 0;
  //hide some of the squares from the user
  while (hiddenCount < squaresToHide) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (!board[row][col].hidden) {
      board[row][col].hidden = true;
      board[row][col].correct = null;
      hiddenCount++;
    }
  }
  return board;
}
