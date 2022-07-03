import params from '../../params';

const pieceFirstColumnWithFilledCell = (pieceValues: number[][]) => {
  for (let col = 0; col < pieceValues.length; col++) {
    for (let row = 0; row < pieceValues[col].length; row++) {
      if (pieceValues[row][col] !== 0) {
        return col;
      }
    }
  }
  return pieceValues.length;
};

const pieceLastColumnWithFilledCell = (pieceValues: number[][]) => {
  for (let col = pieceValues.length - 1; col > 0; col--) {
    for (let row = 0; row < pieceValues[col].length; row++) {
      if (pieceValues[row][col] !== 0) {
        return col;
      }
    }
  }
  return pieceValues.length;
};

export const pieceCanMoveLeft = ({
  pieceXOffset,
  pieceValues,
}: {
  pieceXOffset: number;
  pieceValues: number[][];
}) => {
  const pieceRightColumn = pieceFirstColumnWithFilledCell(pieceValues);
  if (pieceXOffset + pieceRightColumn > 0) {
    return true;
  }
  return false;
};

export const pieceCanMoveRight = ({
  pieceXOffset,
  pieceValues,
}: {
  pieceXOffset: number;
  pieceValues: number[][];
}) => {
  const pieceLeftColumn = pieceLastColumnWithFilledCell(pieceValues);
  if (pieceXOffset + pieceLeftColumn < params.board.cols - 1) {
    return true;
  }
  return false;
};
