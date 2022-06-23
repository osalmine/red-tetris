import { ActivePiece } from '../types';

const rotateFourByFour = (values: number[][]) => {
  const width = 4;
  const rotatedPiece = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  for (let col = 0; col < width; col++) {
    for (let row = 0; row < width; row++) {
      console.log(`values[${row}][${col}]: ${values[row][col]}`);
      rotatedPiece[col][row] = values[row][col];
      console.log(`rotatedPiece[${col}][${row}]: ${rotatedPiece[col][row]}`);
      console.log(`rotatedPiece: ${rotatedPiece}`, rotatedPiece);
    }
  }
  return rotatedPiece;
};

const rotateThreeByThree = (values: number[][]) => {
  const rotatedPiece = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
};

export const rotatePieceRight = ({ values, pieceType }: ActivePiece) => {
  // const rotatedPiece = Array(4).fill(Array(4).fill(0));
  // No need to rotate
  if (pieceType === 'O') {
    return values;
  }
  const rotatedPiece = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  console.log('rotatedPiece', rotatedPiece);
  console.log('values', values);
  for (let col = 0; col < values.length; col++) {
    for (let row = 0; row < values[col].length; row++) {
      console.log(`values[${row}][${col}]: ${values[row][col]}`);
      rotatedPiece[col][row] = values[row][col];
      console.log(`rotatedPiece[${col}][${row}]: ${rotatedPiece[col][row]}`);
      console.log(`rotatedPiece: ${rotatedPiece}`, rotatedPiece);
    }
  }
  console.log('rotatedPiece values', rotatedPiece);
  return rotatedPiece;
};
