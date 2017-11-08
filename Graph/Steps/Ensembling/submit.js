import { reset } from 'redux-form';

import { PipelineEnsemblingStep } from '../../Entities/';

export default (values, dispatch, { addNode, onDone }) => {
  return new Promise((resolve) => {
    let edges = [];

    const {
      title,
      notebook,
      stepsEnsembling = [],
    } = values;

    edges = [...edges, ...stepsEnsembling.map(({ id }) => id)];
    
    addNode({
      node: new PipelineEnsemblingStep({
        label: `Ensembling Step ${title}`,
        meta: {
          title,
          notebook,
          stepsEnsembling,
        },
      }),
      edges,
    });
    onDone();
    dispatch(reset(PipelineEnsemblingStep.getGroup()));
    resolve();
  }).catch(console.warn);
};
