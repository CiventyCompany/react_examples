import { reset, formValueSelector } from 'redux-form';

import { PipelineEvaluationStep } from '../../Entities/';

import {
  ROOT_FORM,
} from '../../names';

export default (values, dispatch, { addNode, onDone }) => {
  return new Promise((resolve) => {
    dispatch((d, getState) => {
      let edges = [];
    
      const hasSubSolution = formValueSelector(ROOT_FORM)(getState(), 'subSoluiton');

      const {
        title,
        notebook,
        summary,
        predictionSource,
        predictionPipelines,
        predictionSelectedNodes,
      } = values;

      if (hasSubSolution || predictionSource === 'GRAPH_SELECT') {
        edges = [...edges, ...predictionSelectedNodes.map(({ id }) => id)];
      }

      addNode({
        node: new PipelineEvaluationStep({
          label: `Evaluation Step ${title}`,
          meta: {
            title,
            notebook,
            summary,
            predictionSource,
            predictionPipelines,
            predictionSelectedNodes,
          },
        }),
        edges,
      });
      onDone();
      dispatch(reset(PipelineEvaluationStep.getGroup()));
      resolve();
    });
  }).catch(console.warn);
};
