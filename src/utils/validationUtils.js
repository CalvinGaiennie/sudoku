//Check if a certain number in a certain square is follows the rules of sudoku
export function checkIsValid(board, row, col, num) {
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
