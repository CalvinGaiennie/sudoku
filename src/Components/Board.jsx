import styles from "./Board.module.css";

// function checkIsValid(board, row, col, num) {
//   for (let i = 0; i < 9; i++) {
//     if (board[row][i] === num || board[i][col]) {
//       return false;
//     }
//   }

//   const startRow = Math.floor(row / 3) * 3;
//   const startCol = Math.floor(col / 3) * 3;
//   for (let i = startRow; i < startRow + 3; i++) {
//     for (let j = startCol; j < startCol + 3; j++) {
//       if (board[i][j] === num) {
//         return false;
//       }
//     }
//   }
// }

function Board() {
  //I need to use math to add classes for the large squares and use the indexes to add ids, also need to add classes or data for rows and columns
  function createGrid() {
    return Array.from({ length: 9 }).map((_, outerIndex) => (
      <div key={`${outerIndex}-a`} className={styles[`row${outerIndex}`]}>
        {Array.from({ length: 9 }).map((_, innerIndex) => (
          <div
            key={`${outerIndex}-${innerIndex}`}
            className={styles[`column${innerIndex}`]}
          >{`${outerIndex}-${innerIndex}`}</div>
        ))}
      </div>
    ));
  }
  return <div className={styles.boardContainer}>{createGrid()}</div>;
}

export default Board;
