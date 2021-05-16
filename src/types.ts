import { PNode } from './pnode';
import { SanOrCastles, Move } from 'chests';

export type Fen = string
export type Ply = number

export type QPGN = {
  tags: TagMap,
  fenMap: FenMap,
  variations: PNode<QMove>,
  branchPlies: Array<Ply>
}

export type QMove = {
  ply: Ply,
  maxPly?: Ply,
  move: SanMetaWithExtra,
  tsmove?: Move,
  fenAfter?: Fen
}

export type QScore = {
  ply: Ply,
  maxPly: Ply
}

export type TagMap = Map<string, string>

export type FenMap = Map<Fen, Array<QMove>>

export type SanMetaWithExtra = {
  san?: SanOrCastles,
  extra: any
}

export type Maybe<A> = A | undefined
