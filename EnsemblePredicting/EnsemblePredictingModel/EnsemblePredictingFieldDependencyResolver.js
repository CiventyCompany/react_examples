import { formValueSelector } from 'redux-form';

import API from '../../../../../../../api';

import {
  createClearFieldsResolver,
  createNoCondidionResolver,
} from '../../AdminCreateFormFieldDependecyResolvers';

import {
  ENSEMBLE_PREDICTING,
} from '../../formNames';

import { FIELD_NAMES, DATA_HOLDERS } from './EnsemblePredictingModel';

import DATASET_TYPES from '../../../../../../Shared/entities/dataset/types/Dataset';
import NOTEBOOK_TYPES from '../../../../../../Shared/entities/notebook/types/Notebook';
import PIPELINE_TYPES from '../../../../../../Shared/entities/pipeline/types/Pipeline';

const selector = formValueSelector(ENSEMBLE_PREDICTING);

export default {
  [FIELD_NAMES.category]: [
    createClearFieldsResolver(ENSEMBLE_PREDICTING, FIELD_NAMES.solution),

    createClearFieldsResolver(ENSEMBLE_PREDICTING, DATA_HOLDERS.solutions),

    createNoCondidionResolver((state, field, value) => API.get('solution/', {
      category: value,
    }).then(res => Promise.resolve({
      field: DATA_HOLDERS.solutions,
      payload: res.data.results,
    })), [DATA_HOLDERS.solutions]),
  ],
  [FIELD_NAMES.solution]: [
    createClearFieldsResolver(ENSEMBLE_PREDICTING, FIELD_NAMES.subSolution),

    createClearFieldsResolver(ENSEMBLE_PREDICTING, DATA_HOLDERS.subSolutions),

    createNoCondidionResolver((state, field, value) => API.get('datasets/', {
      solution: value,
      type: DATASET_TYPES.ORIGINAL,
    }).then(res => Promise.resolve({
      field: DATA_HOLDERS.originalDatasets,
      payload: res.data.results,
    })), [DATA_HOLDERS.originalDatasets]),

    createNoCondidionResolver((state, field, value) => API.get(`solution/${value}/sub-solutions/`)
      .then(res => Promise.resolve({
        field: DATA_HOLDERS.subSolutions,
        payload: res.data.results,
      })), [DATA_HOLDERS.subSolutions]),
    createNoCondidionResolver((state, field, value) => API.get('notebooks/', {
      solution: value,
      type: NOTEBOOK_TYPES.ENSEMBLE,
    }).then(res => Promise.resolve({
      field: DATA_HOLDERS.ensembleNotebooks,
      payload: res.data.results,
    })), [DATA_HOLDERS.ensembleNotebooks]),

    createNoCondidionResolver((state, field, value) => API.get('pipelines/', {
      solution: value,
      type: PIPELINE_TYPES.PREDICT,
    }).then(res => Promise.resolve({
      field: DATA_HOLDERS.predictionPipelines,
      payload: res.data.results,
    })), [DATA_HOLDERS.predictionPipelines]),

    createNoCondidionResolver((state, field, value) => API.get('pipelines/', {
      solution: value,
      type: PIPELINE_TYPES.ENSEMBLE_TESTING,
    }).then(res => Promise.resolve({
      field: DATA_HOLDERS.resultsOfEnsembleTesting,
      payload: res.data.results,
    })), [DATA_HOLDERS.resultsOfEnsembleTesting]),
  ],
  [FIELD_NAMES.subSolution]: [
    createClearFieldsResolver(ENSEMBLE_PREDICTING, FIELD_NAMES.ensembleNotebook),
    createClearFieldsResolver(ENSEMBLE_PREDICTING, FIELD_NAMES.originalDataset),
    createClearFieldsResolver(ENSEMBLE_PREDICTING, FIELD_NAMES.predictionPipeline),
    createClearFieldsResolver(ENSEMBLE_PREDICTING, FIELD_NAMES.resultOfEnsembleTesting),

    createClearFieldsResolver(ENSEMBLE_PREDICTING, DATA_HOLDERS.originalDatasets),
    createClearFieldsResolver(ENSEMBLE_PREDICTING, DATA_HOLDERS.ensembleNotebooks),
    createClearFieldsResolver(ENSEMBLE_PREDICTING, DATA_HOLDERS.resultsOfEnsembleTesting),
    createClearFieldsResolver(ENSEMBLE_PREDICTING, DATA_HOLDERS.predictionPipelines),

    createNoCondidionResolver((state, field, value) => API.get('datasets/', {
      solution: selector(state, FIELD_NAMES.solution),
      sub_solution: value,
      type: DATASET_TYPES.ORIGINAL,
    }).then(res => Promise.resolve({
      field: DATA_HOLDERS.originalDatasets,
      payload: res.data.results,
    })), [DATA_HOLDERS.originalDatasets]),

    createNoCondidionResolver((state, field, value) => API.get('notebooks/', {
      solution: selector(state, FIELD_NAMES.solution),
      sub_solution: value,
      type: NOTEBOOK_TYPES.ENSEMBLE,
    }).then(res => Promise.resolve({
      field: DATA_HOLDERS.ensembleNotebooks,
      payload: res.data.results,
    })), [DATA_HOLDERS.ensembleNotebooks]),

    createNoCondidionResolver((state, field, value) => API.get('pipelines/', {
      solution: selector(state, FIELD_NAMES.solution),
      sub_solution: value,
      type: PIPELINE_TYPES.PREDICT,
    }).then(res => Promise.resolve({
      field: DATA_HOLDERS.predictionPipelines,
      payload: res.data.results,
    })), [DATA_HOLDERS.predictionPipelines]),

    createNoCondidionResolver((state, field, value) => API.get('pipelines/', {
      solution: selector(state, FIELD_NAMES.solution),
      sub_solution: value,
      type: PIPELINE_TYPES.ENSEMBLE_TESTING,
    }).then(res => Promise.resolve({
      field: DATA_HOLDERS.resultsOfEnsembleTesting,
      payload: res.data.results,
    })), [DATA_HOLDERS.resultsOfEnsembleTesting]),
  ],
  [FIELD_NAMES.ensembleNotebook]: [
    createClearFieldsResolver(ENSEMBLE_PREDICTING, FIELD_NAMES.ensembleNotebooksTrainedModels),

    createClearFieldsResolver(ENSEMBLE_PREDICTING, DATA_HOLDERS.ensembleNotebookTrainedModels),

    createNoCondidionResolver((state, field, value) => API.get('trained-models/', {
      notebook: value,
    }).then(res => Promise.resolve({
      field: DATA_HOLDERS.ensembleNotebookTrainedModels,
      payload: res.data.results,
    })), [DATA_HOLDERS.ensembleNotebookTrainedModels]),
  ],
};
