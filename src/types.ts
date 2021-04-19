import { nt, ts } from 'tschess';

export type Ply = number

export type QPGN = {
  tags: TagMap,
  fenMap: FenMap,
  branchPlies: Array<Ply>
}

export type QMove = {
  ply: Ply,
  maxPly?: Ply,
  move: SanMetaWithExtra,
  tsmove?: ts.Move,
  fenAfter?: nt.Fen
}

export type QScore = {
  ply: Ply,
  maxPly: Ply
}

export type TagMap = Map<string, string>

export type FenMap = Map<nt.Fen, Array<QMove>>

export type SanMetaWithExtra = {
  sanMeta?: nt.SanMetaOrCastles,
  extra: any
}

export type Maybe<A> = A | undefined
