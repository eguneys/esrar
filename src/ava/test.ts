import test from 'ava';
import Esrar from '../';
import { simple } from './_fixture';

test.failing('olleh', t => {

  let esrar = Esrar(simple);

  console.log(esrar.pgns[0].fenMap);
  
});
