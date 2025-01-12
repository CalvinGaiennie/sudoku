import { assignBorderClass } from "./styleUtils.js";

export function handleGuess(gameBoard, selectedSquare, number) {
  if (
    !selectedSquare ||
    !gameBoard[selectedSquare.row][selectedSquare.col].hidden
  ) {
    return gameBoard;
  }

  // Create a deep copy of the gameBoard
  const newBoard = gameBoard.map((row) => row.map((square) => ({ ...square })));

  // Update the copy
  if (newBoard[selectedSquare.row][selectedSquare.col].value !== number) {
    newBoard[selectedSquare.row][selectedSquare.col].correct = false;
  } else {
    newBoard[selectedSquare.row][selectedSquare.col].hidden = false;
    newBoard[selectedSquare.row][selectedSquare.col].correct = true;
  }

  return newBoard;
}

export function createGridElements(
  gameBoard,
  selectedSquare,
  styles,
  handleSquareClick
) {
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
            } ${square.correct === false ? styles.incorrect : ""}`}
            onClick={() => handleSquareClick(outerIndex, innerIndex)}
          >
            {!square.hidden ? square.value : ""}
          </button>
        );
      })}
    </div>
  ));
}

export function checkForWin(gameBoard) {
  return gameBoard.every((row) =>
    row.every((square) => !square.hidden && square.correct)
  );
}
