import test from 'ava';
import Esrar from '../';
import { result10, more, simple, advanced, tarrasch, antisic } from './_fixture';
import * as q from '../qpgn';

test('result 1-0', t => {
  t.is(Esrar(result10).pgns.length, 1);
});

test('anti sicilian', t => {
  t.is(Esrar(antisic).pgns.length, 1);
});

test('tarrasch', t => {
  t.is(Esrar(tarrasch).pgns.length, 1);
});


test.skip('london', t => {
  t.is(Esrar(more).pgns.length, 5);
});

test('frenchadvanced', t => {
  let qpgn = Esrar(advanced).pgns[0].fenMap;

  let b2d4 = qpgn.get('2r1k2r/pp1bbppp/1qn1p2n/3pP3/3p1P2/P1P2N2/1PB3PP/RNBQ1RK1 w - - 0 1')!;

  t.is(b2d4[0].tsmove?.san, 'cxd4');
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

  //console.log(esrar.pgns[0].fenMap);

  let d4d6 = 'rnbqkbnr/ppp1pppp/3p4/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2';


  t.truthy(q.qFen(esrar.pgns[0], d4d6));
});
