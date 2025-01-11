//Assign classes to the squares based on their location on the board to create the grid
export function assignBorderClass(row, column, styles) {
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
