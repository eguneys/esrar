import * as erm from './types';

function almostEqual(fen: string, key: string) {
  let fs = fen.split(' '),
  ks = key.split(' ');
  return fs[0] === ks[0] && fs[1] === ks[1];
}

export function qFen(pgn: erm.QPGN, fen: string) {
  for (let key of pgn.fenMap.keys()) {
    if (almostEqual(fen, key)) {
      return pgn.fenMap.get(key);
    }
  }
}

export function qUci(move: erm.QMove) {
  if (move.tsmove) {
    return move.tsmove.uci;
  }
}

export function qScore(pgn: erm.QPGN, move: erm.QMove): erm.QScore {
  return {
    ply: move.ply,
    maxPly: move.maxPly || move.ply
  }
}
