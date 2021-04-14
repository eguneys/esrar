import { ts } from 'tschess';
import { nt } from 'nefs';

export type QPGN = {
  tags: TagMap,
  fenMap: FenMap
}

export type QMove = {
  ply: number,
  move: SanMetaWithExtra,
  tsmove?: ts.Move,
  fenAfter?: nt.Fen
}

export type TagMap = Map<string, string>

export type FenMap = Map<number, Array<QMove>>

export type SanMetaWithExtra = {
  sanMeta?: nt.SanMetaOrCastles,
  extra: any
}

export type Maybe<A> = A | undefined
