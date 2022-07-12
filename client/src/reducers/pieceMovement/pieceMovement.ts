import {
  DropPieceAction,
  MovePieceDownAction,
  MovePieceLeftAction,
  MovePieceRigthAction,
  RotatePieceLeftAction,
  RotatePieceRightAction,
  AddNewActivePieceAction,
} from '../../actions/types';
import { PieceState } from '../types';
import * as internalEvents from '../../constants/internalEvents';
import params from '../../params';
import { pieceCanRotate, rotatePieceRight } from './rotatePiece';
import { pieceCanMoveLeft, pieceCanMoveRight } from './utils';

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

const pieceMovementReducer = (
  state: PieceState = {},
  action: PieceMovementAction
): PieceState => {
  switch (action.type) {
    case internalEvents.ACTIVE_PIECE: {
      const newState = {
        ...state,
        activePiece: {
          values: action.values,
          pieceXOffset: action.pieceXOffset,
          pieceYOffset: action.pieceYOffset,
          pieceType: action.pieceType,
        },
      };
      return newState;
    }
    case internalEvents.MOVE_DOWN: {
      if (state.activePiece) {
        const { activePiece } = state;
        if (
          pieceCanMoveDown({
            pieceYOffset: activePiece.pieceYOffset,
            pieceValues: activePiece.values,
          })
        ) {
          const newState = {
            ...state,
            activePiece: {
              ...activePiece,
              pieceYOffset: activePiece.pieceYOffset + 1,
            },
          };
          return newState;
        }

        return {
          ...state,
          activePiece: null,
          previousPiece: {
            values: activePiece.values,
            pieceYOffset: activePiece.pieceYOffset,
            pieceXOffset: activePiece.pieceXOffset,
            pieceType: activePiece.pieceType,
          },
        };
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
      if (state.activePiece) {
        const newState = {
          ...state,
          activePiece: {
            ...state.activePiece,
            values: rotatePieceRight(state.activePiece),
          },
        };
        console.log('OLD STATE', state);
        console.log('NEW STATE', newState);
        if (pieceCanRotate(newState.activePiece)) {
          return newState;
        }
        return state;
      }
      return state;
    }
    default:
      return state;
  }
};

export default pieceMovementReducer;
