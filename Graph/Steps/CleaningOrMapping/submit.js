import { reset } from 'redux-form';

import { PipelineCleanOrMappingStep } from '../../Entities/';

export default (values, dispatch, { addNode, onDone }) => {
  return new Promise((resolve) => {
    let edges = [];

    const {
      title,
      notebook,
      dataset,
      rfc,
    } = values;

    addNode({
      node: new PipelineCleanOrMappingStep({
        label: `Clean or Mapping Step ${title}`,
        meta: {
          title,
          notebook,
          dataset,
          rfc,
        },
      }),
      edges,
    });
    onDone();
    dispatch(reset(PipelineCleanOrMappingStep.getGroup()));
    resolve();
  }).catch(console.warn);
};
