import { PieceName } from '../../constants/pieces';
import { ActivePiece } from '../types';

const getEmptyPieceContainer = (pieceCharacter: PieceName) => {
  switch (pieceCharacter) {
    case 'O':
      return [
        [0, 0],
        [0, 0],
      ];
    case 'J':
    case 'S':
    case 'T':
    case 'Z':
    case 'L':
      return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
    case 'I':
      return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    default:
      return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
  }
};

// const rotatedPiece = [
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0],
// ];

export const rotatePieceRight = ({ values, pieceType }: ActivePiece) => {
  /**
   * No need to rotate
   */
  if (pieceType === 'O') {
    return values;
  }

  // const rotatedPiece = getEmptyPieceContainer(pieceType);

  // const rotatedPiece: number[][] = new Array(values.length)
  //   .fill(0)
  //   .map((item) => {
  //     console.log('ITEM ALREADY EXISTING IN ARRAY', item);
  //     const newArr = new Array(values.length).fill(0);
  //     console.log('NEW ARRAY IN MAP', newArr);
  //     return newArr;
  //   });
  const rotatedPiece = [...Array(values.length)].map(() =>
    Array(values.length).fill(0)
  );
  for (let i = 0; i < rotatedPiece.length; i++) {
    console.log(`INDEX ${i}, rotatedPiece[${i}]: ${rotatedPiece[i]}`);
  }
  console.log('rotatedPiece', rotatedPiece);

  // const rotatedPiece = values.map((row) => row.slice());

  console.log('VALUES', values, ' len', values.length);

  // const rotatedPiece = [
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  //   [0, 0, 0, 0],
  // ];
  console.log('-------------ROTATION LOOP-------------');

  for (let col = 0; col < values.length; col++) {
    for (let row = 0; row < values[col].length; row++) {
      console.log(`values[${row}][${col}]: ${values[row][col]}`);
      rotatedPiece[col][row] = values[row][col];
      console.log(`rotatedPiece[${col}][${row}]: ${rotatedPiece[col][row]}`);
      console.log(`rotatedPiece: ${rotatedPiece}`, rotatedPiece);
    }
  }
  console.log('-------------END ROTATION LOOP-------------');
  console.log('rotatedPiece values', rotatedPiece);
  return rotatedPiece;
};
