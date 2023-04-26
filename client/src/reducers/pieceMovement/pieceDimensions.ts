/* eslint-disable no-undefined */
import { CellType, EMPTY } from '../../constants/cellType';

export const pieceLastRowWithFilledCell = (pieceValues: CellType[][]): number =>
  pieceValues.reduce(
    (lastIndex, row, index) =>
      row.some((cell) => cell !== EMPTY) ? index : lastIndex,
    0
  );

export const pieceFirstColumnWithFilledCell = (
  pieceValues: CellType[][]
): number => {
  const numOfCols = pieceValues[0].length;
  const firstColumnWithFilledCell = Array.from(
    { length: numOfCols },
    (_, col) => col
  ).find((column) => pieceValues.some((row) => row[column] !== EMPTY));
  return firstColumnWithFilledCell === undefined ||
    firstColumnWithFilledCell === -1
    ? pieceValues.length
    : firstColumnWithFilledCell;
};

export const pieceLastColumnWithFilledCell = (
  pieceValues: CellType[][]
): number => {
  const numOfCols = pieceValues[0].length;
  const firstColumnWithFilledCell = Array.from(
    { length: numOfCols },
    (_, col) => col
  )
    .reverse()
    .find((column) => pieceValues.some((row) => row[column] !== EMPTY));
  return firstColumnWithFilledCell === undefined ||
    firstColumnWithFilledCell === -1
    ? pieceValues.length
    : firstColumnWithFilledCell;
};
