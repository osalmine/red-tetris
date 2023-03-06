import {
  DropPieceAction,
  MovePieceDownAction,
  MovePieceLeftAction,
  MovePieceRigthAction,
  RotatePieceLeftAction,
  RotatePieceRightAction,
  AddNewActivePieceAction,
} from '../../actions/types';
import { PieceState } from '../../types';
import * as internalEvents from '../../constants/internalEvents';
import { pieceCanRotate, rotatePieceRight } from './rotatePiece';
import { pieceCanMoveDown } from './utils';
import { pieceCanMoveRight } from './pieceRightMovement';
import { pieceCanMoveLeft } from './pieceLeftMovement';
import { dropPieceGetYOffset } from './pieceDrop';

type PieceMovementAction =
  | MovePieceDownAction
  | MovePieceRigthAction
  | MovePieceLeftAction
  | RotatePieceRightAction
  | RotatePieceLeftAction
  | DropPieceAction
  | AddNewActivePieceAction;

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
        const { field } = action.board;
        if (
          pieceCanMoveDown({
            piece: activePiece,
            field,
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
          piece: state.activePiece,
          field: action.board.field,
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
          piece: state.activePiece,
          field: action.board.field,
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
        if (
          pieceCanRotate({
            piece: newState.activePiece,
            field: action.board.field,
          })
        ) {
          return newState;
        }
        return state;
      }
      return state;
    }
    case internalEvents.DROP_PIECE: {
      const { field } = action.board;
      if (state.activePiece) {
        const newState = {
          ...state,
          activePiece: null,
          previousPiece: {
            ...state.activePiece,
            pieceYOffset: dropPieceGetYOffset({
              piece: state.activePiece,
              field,
            }),
          },
        };
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
};

export default pieceMovementReducer;
