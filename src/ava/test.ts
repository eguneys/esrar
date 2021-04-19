import test from 'ava';
import Esrar from '../';
import { more, simple } from './_fixture';
import * as q from '../qpgn';
import { nt, m, db, f, san, tssan } from 'tschess';

test('d4', t => {

  let situation = f.situation(nt.initialFen)!;

  let move = tssan.moveOrCastle(san.str2meta('d4')!, situation)
  t.truthy(move);
  t.is(f.fen(m.situationAfter(move!)), 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1');
});

test('score', t => {
  let esrar = Esrar(simple);

  let d4d6 = 'rnbqkbnr/ppp1pppp/3p4/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2';
  let qPgn = esrar.pgns[0];
  let Nf3 = q.qFen(qPgn, d4d6)![0];
  t.deepEqual(q.qScore(qPgn, Nf3), {
    ply: 3,
    maxPly: 3
  });
});

test('pgns', t => {

  let esrar = Esrar(simple);

  console.log(esrar.pgns[0].fenMap);

  let d4d6 = 'rnbqkbnr/ppp1pppp/3p4/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2';


  t.truthy(q.qFen(esrar.pgns[0], d4d6));
});

test('london', t => {
  t.is(Esrar(more).pgns.length, 5);
});
