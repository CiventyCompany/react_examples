import { reset } from 'redux-form';

import { PipelineDividerStep } from '../../Entities/';

export default (values, dispatch, { addNode, onDone }) => {
  return new Promise((resolve) => {
    let edges = [];

    const {
      title,
      notebook,
      dateRange,
      datasetSource,
      extensionDatasetId,
      canonnicalDatasetId,
      customersDatasetId,
      datasetConnectedNodes,
    } = values;

    if (datasetSource === 'GRAPH_SELECT') {
      edges = [...edges, ...datasetConnectedNodes.map(({ id }) => id)];
    }

    addNode({
      node: new PipelineDividerStep({
        label: `Divider Step ${title}`,
        meta: {
          title,
          notebook,
          dateRange,
          datasetSource,
          extensionDatasetId,
          canonnicalDatasetId,
          customersDatasetId,
          datasetConnectedNodes,
        },
      }),
      edges,
    });
    onDone();
    dispatch(reset(PipelineDividerStep.getGroup()));
    resolve();
  }).catch(console.warn);
};
