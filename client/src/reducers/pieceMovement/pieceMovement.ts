/* eslint-disable no-undefined */
import {
  DropPieceAction,
  MovePieceDownAction,
  MovePieceLeftAction,
  MovePieceRigthAction,
  RotatePieceLeftAction,
  RotatePieceRightAction,
  AddNewActivePieceAction,
  ServerResetGame,
  AddNextPieceAction,
} from '../../actions/types';
import { PieceState } from '../../types';
import * as internalEvents from '../../constants/internalEvents';
import * as incomingEvents from '../../constants/incomingEvents';
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
  | AddNewActivePieceAction
  | AddNextPieceAction
  | ServerResetGame;

const pieceMovementReducer = (state: PieceState = {}, action: PieceMovementAction): PieceState => {
  switch (action.type) {
    case incomingEvents.RESET: {
      const newState = {
        ...state,
        activePiece: undefined,
        previousPiece: undefined,
        nextPieceType: undefined,
      } satisfies PieceState;
      return newState;
    }
    case internalEvents.ACTIVE_PIECE: {
      const newState = {
        ...state,
        activePiece: {
          values: action.values,
          pieceXOffset: action.pieceXOffset,
          pieceYOffset: action.pieceYOffset,
          pieceType: action.pieceType,
        },
        nextPieceType: undefined,
      } satisfies PieceState;
      return newState;
    }
    case internalEvents.NEXT_PIECE: {
      const newState = {
        ...state,
        nextPieceType: action.pieceType,
      } satisfies PieceState;
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
          } satisfies PieceState;
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
        } satisfies PieceState;
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
        } satisfies PieceState;
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
        } satisfies PieceState;
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
        } satisfies PieceState;
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
        } satisfies PieceState;
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
};

export default pieceMovementReducer;
