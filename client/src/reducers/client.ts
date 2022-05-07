import {
  AddNewActivePieceAction,
  JoinRoomAction,
  MovePieceDownAction,
} from '../actions/types';
import { ClientState } from './types';
import * as outgoingEvents from '../constants/outgoingEvents';
import * as internalEvents from '../constants/internalEvents';
import params from '../params';

type ClientAction =
  | JoinRoomAction
  | AddNewActivePieceAction
  | MovePieceDownAction;

const pieceCanMoveDown = ({
  pieceYOffset,
  pieceValues,
}: {
  pieceYOffset: number;
  pieceValues: number[][];
}): boolean => {
  if (pieceYOffset > 10) {
    return true;
  }
  return false;
};

const joinRoomReducer = (
  state: ClientState = {},
  action: ClientAction
): ClientState => {
  switch (action.type) {
    case outgoingEvents.JOIN: {
      const newState = {
        ...state,
        playerName: action.playerName,
        roomName: action.roomName,
        pieceIndex: 0,
      };
      return newState;
    }
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
          state.activePiece.pieceYOffset + state.activePiece.values.length <
          params.board.rows - 1
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
        console.log(
          `pieceIndex: ${state.pieceIndex ? state.pieceIndex + 1 : 0}`
        );
        console.log(`state.pieceIndex: ${state.pieceIndex}`);
        const newState = {
          ...state,
          activePiece: null,
          pieceIndex: (state.pieceIndex as number) + 1,
        };
        return newState;
      }
      return state;
    }
    default:
      return state;
  }
};

export default joinRoomReducer;
