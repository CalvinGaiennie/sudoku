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
  // function createGrid() {
  //   return Array.from({ length: 9 }).map((_, parentIndex) => (
  //     <div key={parentIndex} className={styles.bigSquare}>
  //       {Array.from({ length: 9 }).map((_, childIndex) => (
  //         <p
  //           key={childIndex}
  //           className={styles.square}
  //           id={`${parentIndex + 1}-${childIndex + 1}`}
  //         >
  //           {`s${parentIndex + 1}-i${childIndex + 1}`}
  //         </p>
  //       ))}
  //     </div>
  //   ));
  // }

  //I need to use math to add classes for the large squares and use the indexes to add ids, also need to add classes or data for rows and columns
  function createGridTwo() {
    return Array.from({ length: 9 }).map((_, outerIndex) => (
      <div key={`${outerIndex}-a`}>
        {Array.from({ length: 9 }).map((_, innerIndex) => (
          <div
            key={`${outerIndex}-${innerIndex}`}
          >{`${outerIndex}-${innerIndex}`}</div>
        ))}
      </div>
    ));
  }
  return <div className={styles.boardContainer}>{createGridTwo()}</div>;
}

export default Board;
