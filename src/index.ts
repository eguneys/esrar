import esra, { dis } from 'esra';
import StudyBuilder from './builder';

export { default as StudyBuilder } from './builder';
export * as erm from './types';
export * as q from './qpgn';

export default function Esrar(study: string) {

  let builder = new StudyBuilder();

  let model = esra(study);
  let ds = new dis.Disect(builder.d());
  
  if (model) {
    ds.study(model);
  }

  return builder;
}
