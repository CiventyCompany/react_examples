import { reset } from 'redux-form';

import { PipelineTestOrPredictingStep } from '../../Entities/';

export default (values, dispatch, { addNode, onDone }) => {
  return new Promise((resolve) => {
    let edges = [];

    const {
      title,
      trainedModelSource,
      trainedModelId,
      traindeModelSelectedNodes,
      extensionDatasetSource,
      extensionDatasetId,
      extensionDatasetSelectedNodes,
      datasetSource,
      datasetId,
      datasetSelectedNodes,
    } = values;

    if (trainedModelSource === 'GRAPH_SELECT') {
      edges = [...edges, ...traindeModelSelectedNodes.map(({ id }) => id)];
    }
    
    if (extensionDatasetSource === 'GRAPH_SELECT') {
      edges = [...edges, ...extensionDatasetSelectedNodes.map(({ id }) => id)];
    }

    if (datasetSource === 'GRAPH_SELECT') {
      edges = [...edges, ...datasetSelectedNodes.map(({ id }) => id)];
    }

    addNode({
      node: new PipelineTestOrPredictingStep({
        label: `Test or Predicting Step ${title}`,
        meta: {
          title,
          trainedModelSource,
          trainedModelId,
          traindeModelSelectedNodes,
          extensionDatasetSource,
          extensionDatasetId,
          extensionDatasetSelectedNodes,
          datasetSource,
          datasetId,
          datasetSelectedNodes,
        },
      }),
      edges,
    });
    onDone();
    dispatch(reset(PipelineTestOrPredictingStep.getGroup()));
    resolve();
  }).catch(console.warn);
};
