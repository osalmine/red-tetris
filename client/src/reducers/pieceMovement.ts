import {
  DropPieceAction,
  MovePieceDownAction,
  MovePieceLeftAction,
  MovePieceRigthAction,
  RotatePieceLeftAction,
  RotatePieceRightAction,
  AddNewActivePieceAction,
} from '../actions/types';
import { PieceState } from './types';
import * as internalEvents from '../constants/internalEvents';
import params from '../params';

type PieceMovementAction =
  | MovePieceDownAction
  | MovePieceRigthAction
  | MovePieceLeftAction
  | RotatePieceRightAction
  | RotatePieceLeftAction
  | DropPieceAction
  | AddNewActivePieceAction;

const pieceLastRowWithFilledCell = (pieceValues: number[][]) => {
  let lastRowWithFilledCell = 0;
  for (let i = 0; i < pieceValues.length; i++) {
    if (pieceValues[i].some((cell) => cell !== 0)) {
      lastRowWithFilledCell = i;
    }
  }
  return lastRowWithFilledCell;
};

const pieceCanMoveDown = ({
  pieceYOffset,
  pieceValues,
}: {
  pieceYOffset: number;
  pieceValues: number[][];
}) => {
  const actualPieceLength = pieceLastRowWithFilledCell(pieceValues);
  if (pieceYOffset + actualPieceLength < params.board.rows - 1) {
    return true;
  }
  return false;
};

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

const pieceCanMoveLeft = ({
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

const pieceCanMoveRight = ({
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

const rotatePieceRight = (values: number[][]) => {
  const rotatedPiece = values;
  console.log('values', values);
  for (let col = 0; col < values.length; col++) {
    for (let row = 0; row < values[col].length; row++) {
      rotatedPiece[col][row] = values[row][col];
    }
  }
  console.log('rotatedPiece values', rotatedPiece);
  return rotatedPiece;
};

const pieceMovementReducer = (
  state: PieceState = {},
  action: PieceMovementAction
): PieceState => {
  console.log('STATE', state);
  switch (action.type) {
    case internalEvents.ACTIVE_PIECE: {
      const newState = {
        ...state,
        activePiece: {
          values: action.activePiece,
          pieceXOffset: action.pieceXOffset,
          pieceYOffset: action.pieceYOffset,
        },
      };
      return newState;
    }
    case internalEvents.MOVE_DOWN: {
      if (state.activePiece) {
        if (
          pieceCanMoveDown({
            pieceYOffset: state.activePiece.pieceYOffset,
            pieceValues: state.activePiece.values,
          })
        ) {
          const newState = {
            ...state,
            activePiece: {
              ...state.activePiece,
              pieceYOffset: state.activePiece.pieceYOffset + 1,
            },
          };
          return newState;
        }

        const newState = {
          ...state,
          activePiece: null,
        };
        return newState;
      }
      return state;
    }
    case internalEvents.MOVE_RIGHT: {
      if (
        state.activePiece &&
        pieceCanMoveRight({
          pieceXOffset: state.activePiece.pieceXOffset,
          pieceValues: state.activePiece.values,
        })
      ) {
        const newState = {
          ...state,
          activePiece: {
            ...state.activePiece,
            pieceXOffset: state.activePiece.pieceXOffset + 1,
          },
        };
        return newState;
      }
      return state;
    }
    case internalEvents.MOVE_LEFT: {
      if (
        state.activePiece &&
        pieceCanMoveLeft({
          pieceXOffset: state.activePiece.pieceXOffset,
          pieceValues: state.activePiece.values,
        })
      ) {
        const newState = {
          ...state,
          activePiece: {
            ...state.activePiece,
            pieceXOffset: state.activePiece.pieceXOffset - 1,
          },
        };
        return newState;
      }
      return state;
    }
    case internalEvents.ROTATE_RIGHT: {
      console.log('state.activePiece values', state.activePiece?.values);
      const currentActivePiece = Object.assign({}, state.activePiece);
      if (state.activePiece) {
        rotatePieceRight(currentActivePiece.values);
      }

      // if (state.activePiece) {
      //   const newState = {
      //     ...state,
      //     activePiece: {
      //       ...state.activePiece,
      //       values: rotatePieceRight(state.activePiece.values),
      //     },
      //   };
      //   return newState;
      // }
      return state;
    }
    default:
      return state;
  }
};

export default pieceMovementReducer;
