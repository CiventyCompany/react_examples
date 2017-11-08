import { reset } from 'redux-form';

import { PipelineTrainingStep } from '../../../Entities/index.js';

export default (values, dispatch, { addNode, onDone }) => {
  return new Promise((resolve) => {
    let edges = [];

    const {
      title,
      notebook,
      trainingModel,
      extensionDatasetSource,
      extensionDatasetSourceSelectedNodes,
      extensionDatasetId,
      datasetSource,
      datasetSourceType,
      datasetSourceSelectedNodes,
    } = values;

    if (extensionDatasetSource === 'GRAPH_SELECT') {
      edges = [...edges, ...extensionDatasetSourceSelectedNodes.map(({ id }) => id)];
    }

    if (datasetSource === 'GRAPH_SELECT') {
      edges = [...edges, ...datasetSourceSelectedNodes.map(({ id }) => id)];
    }

    addNode({
      node: new PipelineTrainingStep({
        label: `Training Step ${title}`,
        meta: {
          notebook,
          trainingModel,
          extensionDatasetSource,
          extensionDatasetSourceSelectedNodes,
          extensionDatasetId,
          datasetSource,
          datasetSourceType,
          datasetSourceSelectedNodes,
        },
      }),
      edges,
    });
    onDone();
    dispatch(reset(PipelineTrainingStep.getGroup()));
    resolve();
  }).catch(console.warn);
};
