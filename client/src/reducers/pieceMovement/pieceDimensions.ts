export const pieceLastRowWithFilledCell = (pieceValues: number[][]) => {
  let lastRowWithFilledCell = 0;
  for (let i = 0; i < pieceValues.length; i++) {
    if (pieceValues[i].some((cell) => cell !== 0)) {
      lastRowWithFilledCell = i;
    }
  }
  return lastRowWithFilledCell;
};

export const pieceFirstColumnWithFilledCell = (pieceValues: number[][]) => {
  for (let col = 0; col < pieceValues.length; col++) {
    for (let row = 0; row < pieceValues[col].length; row++) {
      if (pieceValues[row][col] !== 0) {
        return col;
      }
    }
  }
  return pieceValues.length;
};

export const pieceLastColumnWithFilledCell = (pieceValues: number[][]) => {
  for (let col = pieceValues.length - 1; col > 0; col--) {
    for (let row = 0; row < pieceValues[col].length; row++) {
      if (pieceValues[row][col] !== 0) {
        return col;
      }
    }
  }
  return pieceValues.length;
};