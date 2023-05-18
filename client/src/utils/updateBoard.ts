import { Dispatch } from 'redux';

import { EMPTY, FILLED } from '../constants/cellType';
import params from '../params';
import { Board, Piece, Player } from '../types';
import { spliceArrayToArray } from './spliceArrayToArray';
import { blockOpponentRows, clientUpdateState } from '../actions/server';
import { addNextPiece } from '../actions/client';

const handleFilledRows = (board: Player['board']): [Board, number] => {
  const newBoard: Board = JSON.parse(JSON.stringify(board));

  let linesRemoved = 0;

  const reversedField = newBoard.field.slice(0).reverse();
  for (let i = 0; i < reversedField.length; i++) {
    const row = reversedField[i];
    if (row.every(cell => cell === FILLED)) {
      linesRemoved++;
      reversedField.splice(i, 1);
      reversedField.push(new Array(params.board.cols).fill(EMPTY));
      i--;
    }
  }
  newBoard.field = reversedField.slice(0).reverse();
  return [newBoard, linesRemoved];
};

const updateClientBoard = ({
  previousPiece,
  board,
}: {
  previousPiece: Piece;
  board: Board;
}): [Board, number] => {
  const newBoard: Board = JSON.parse(JSON.stringify(board));

  let j = 0;
  for (
    let i = previousPiece.pieceYOffset;
    i < previousPiece.pieceYOffset + previousPiece.values.length &&
    i < newBoard.field.length &&
    i >= 0;
    i++
  ) {
    newBoard.field[i] = spliceArrayToArray({
      start: previousPiece.pieceXOffset,
      targetArray: [...newBoard.field[i]],
      arrayToInsert: [...previousPiece.values[j]],
      ignoreInInsertArray: 0,
    });
    j++;
  }
  const [newBoardWithRemovedLines, linesRemoved] = handleFilledRows(newBoard);

  return [
    {
      ...newBoardWithRemovedLines,
      isOverflown: previousPiece ? previousPiece.pieceYOffset <= 0 : false,
    },
    linesRemoved,
  ];
};

export const updateBoard = ({
  previousPiece,
  player,
  dispatch,
}: {
  previousPiece: Piece | undefined;
  player: Player;
  dispatch: Dispatch;
}) => {
  const [newBoard, linesRemoved] = previousPiece
    ? updateClientBoard({ previousPiece, board: player.board })
    : [null, null];
  if (linesRemoved && linesRemoved > 1) {
    const numberOfBlockRowsToOpponents = linesRemoved - 1;
    dispatch(
      blockOpponentRows({
        roomName: player.roomName,
        playerName: player.name,
        numberOfBlockRows: numberOfBlockRowsToOpponents,
      }),
    );
  }
  dispatch(addNextPiece(player.pieces[0]));
  dispatch(
    clientUpdateState({
      ...player,
      pieces: [...player.pieces].slice(1),
      board: newBoard ?? player.board,
    }),
  );
};
