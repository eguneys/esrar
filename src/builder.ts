import { nt, m, f, san, tssan } from 'tschess';
import * as erm from './types';
import { pClimbWithRoot, pAdd, pnode, PNode } from './pnode';
import { dis, em } from 'esra';

export type CurrentAndParent = [PNode<erm.QMove> | undefined, PNode<erm.QMove>]

export default class StudyBuilder {

  pgns: Array<erm.QPGN>;
  _tags: erm.TagMap;
  _root?: PNode<erm.QMove>;
  __branchs: Array<CurrentAndParent>;
  __currentParent?: PNode<erm.QMove>;
  __current?: PNode<erm.QMove>;
  fenMap?: erm.FenMap;

  constructor() {
    this.pgns = [];
    this._tags = new Map();
    this.__branchs = [];
  }

  addPgn() {
    let fenMap = new Map();
    if (this._root) {
      pClimbWithRoot(f.situation(nt.initialFen), this._root, (situation, _, maxDepth) => {
        _.maxPly = maxDepth;
        if (situation && _.move.sanMeta) {
          let tsmove = tssan.moveOrCastle(_.move.sanMeta, situation);

          if (tsmove) {
            let after = m.situationAfter(tsmove);
            _.tsmove = tsmove;
            let res = fenMap.get(f.fen(situation));
            if (!res) {
              fenMap.set(f.fen(situation), [_]);
            } else {
              res.push(_);
            }
            return after;
          }
        }
      });
    }

    let branchPlies = [];

    for (let moves of fenMap.values()) {
      if (moves[1]) {
        branchPlies.push(moves[1].ply);
      }
    }
    
    let pgn = {
      tags: this._tags,
      fenMap,
      branchPlies
    };

    this.pgns.push(pgn);

    this._tags = new Map();
    this._root = undefined;
    this.__branchs = [];
    this.__current = undefined;
  }

  addCurrentNode(node: PNode<erm.QMove>) {
    if (this.__current) {
      pAdd(this.__current, node);
    }

    this.__currentParent = this.__current;
    this.__current = node;

    if (!this._root) {
      this._root = this.__current;
    }

  }

  branchSubMoves() {
    if (this.__current) {
      this.__branchs.push([this.__currentParent, this.__current]);
      this.__current = this.__currentParent;
      this.__currentParent = undefined;
    }
  }

  endBranchSubMoves() {
    let _ = this.__branchs.pop()!;

    this.__currentParent = _[0];
    this.__current = _[1];
  }
  
  d(): dis.DisectMap {
    let self = this;
    
    return {
      move(ply: number, move: erm.SanMetaWithExtra) {

        let node = pnode({
          ply,
          move
        });

        self.addCurrentNode(node);
      },
      twomove(ply: number, move: erm.SanMetaWithExtra, move2: erm.SanMetaWithExtra) {
        let node = pnode({
          ply,
          move
        });
        let node2 = pnode({
          ply: ply + 1,
          move: move2
        });

        self.addCurrentNode(node);
        self.addCurrentNode(node2);
      },
      branchSubMoves() {
        self.branchSubMoves();
      },
      endBranchSubMoves() {
        self.endBranchSubMoves();
      },
      pgn(pgn: any) {
        self.addPgn();
      },
      tag(name: string, value: string) {
        self._tags.set(name, value);
      },
      san(_san: string) {
        return san.str2meta(_san);
      },
      sanWithExtra(sanMeta: nt.SanMetaOrCastles | undefined, extra: any) {
        return {
          sanMeta,
          extra
        };
      }
    };
  }
}
