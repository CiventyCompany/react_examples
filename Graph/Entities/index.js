import uuid from 'uuid';
import {
  formValueSelector,
} from 'redux-form';

import {
  TRAINING_STEP,
  CLEANING_OR_MAPPING_STEP,
  DIVIDING_STEP,
  TESTING_OR_PREDICTING_STEP,
  ROOT_DATASET,
  ROOT_FORM,
  EVALUATION_STEP,
  ENSEMBLING_STEP,
} from '../names';

const allowOnlyOne = ({ form, field, state }) => {
  const value = formValueSelector(form)(state, field) || [];
  return value.length < 1;
};

class PipelineNode {
  constructor({
    label = 'No title',
    schema = { input: '', outptut: '' },
    id = uuid(),
    meta = {},
  }) {
    this.id = uuid() + id;
    this.label = label;
    this.schema = schema;
    this.group = this.constructor.getGroup();
    this.meta = meta;
  }

  static getGroup() {}

  canConnectNew(form, type, state) {
    return this.connective
      && this.connective[form]
      && this.connective[form][type]
      && this.connective[form][type](state);
  }
}

export class PipelineRootDataset extends PipelineNode {
  static getGroup() {
    return ROOT_DATASET;
  }

  get connective() {
    return {
      [TRAINING_STEP]: {
        datasetSourceSelectedNodes(state) {
          return allowOnlyOne({
            form: TRAINING_STEP,
            field: 'datasetSourceSelectedNodes',
            state,
          });
        },
        extensionDatasetSourceSelectedNodes(state) {
          return allowOnlyOne({
            form: TRAINING_STEP,
            field: 'extensionDatasetSourceSelectedNodes',
            state,
          });
        },
      },
    };
  }
}


export class PipelineTrainingStep extends PipelineNode {
  static getGroup() {
    return TRAINING_STEP;
  }

  get connective() {
    return {
      [TESTING_OR_PREDICTING_STEP]: {
        traindeModelSelectedNodes(state) {
          return allowOnlyOne({
            form: TESTING_OR_PREDICTING_STEP,
            field: 'traindeModelSelectedNodes',
            state,
          });
        },
      }
    }
  }
}

export class PipelineDividerStep extends PipelineNode {
  static getGroup() {
    return DIVIDING_STEP;
  }

  get connective() {
    return {
      [TRAINING_STEP]: {
        datasetSourceSelectedNodes(state) {
          return allowOnlyOne({
            form: TRAINING_STEP,
            field: 'datasetSourceSelectedNodes',
            state,
          });
        },
        extensionDatasetSourceSelectedNodes(state) {
          return this.meta.extensionDatasetId && allowOnlyOne({
            form: TRAINING_STEP,
            field: 'extensionDatasetSourceSelectedNodes',
            state,
          });
        },
      },
      [TESTING_OR_PREDICTING_STEP]: {
        extensionDatasetSelectedNodes(state) {
          return this.meta.extensionDatasetId && allowOnlyOne({
            form: TESTING_OR_PREDICTING_STEP,
            field: 'extensionDatasetSelectedNodes',
            state,
          });
        },
        datasetSelectedNodes(state) {
          // Is not shown if common "Customer" setting (#3) is not selected.
          // Should use the same DataSet as from "DataSet" setting (#5).
          // Should use an output from "Cleaning or mapping step" of the same DataSet as from "DataSet" setting (#5).
          return formValueSelector(ROOT_FORM)(state, 'customer') && allowOnlyOne({
            form: TESTING_OR_PREDICTING_STEP,
            field: 'datasetSelectedNodes',
            state,
          });
        },
      },
    };
  }
}

export class PipelineCleanOrMappingStep extends PipelineNode {
  static getGroup() {
    return CLEANING_OR_MAPPING_STEP;
  }

  get connective() {
    return {
      [TRAINING_STEP]: {
        datasetSourceSelectedNodes(state) {
          return allowOnlyOne({
            form: TRAINING_STEP,
            field: 'datasetSourceSelectedNodes',
            state,
          });
        },
      },
      [TESTING_OR_PREDICTING_STEP]: {
        datasetSelectedNodes(state) {
          // Is not shown if common "Customer" setting (#3) is not selected.
          // Should use the same DataSet as from "DataSet" setting (#5).
          return formValueSelector(ROOT_FORM)(state, 'customer') && allowOnlyOne({
            form: TESTING_OR_PREDICTING_STEP,
            field: 'datasetSelectedNodes',
            state,
          });
        },
      },
    };
  }
}

export class PipelineTestOrPredictingStep extends PipelineNode {
  static getGroup() {
    return TESTING_OR_PREDICTING_STEP;
  }

  get connective() {
    return {
      [EVALUATION_STEP]: {
        predictionSelectedNodes(state) {
          return true;
        },
      },
    };
  }
}


export class PipelineEvaluationStep extends PipelineNode {
  static getGroup() {
    return EVALUATION_STEP;
  }

  get connective() {
    return {
      [ENSEMBLING_STEP]: {
        stepsEnsembling(state) {
          return true;
        },
      },
    };
  }
}

export class PipelineEnsemblingStep extends PipelineNode {
  static getGroup() {
    return ENSEMBLING_STEP;
  }
}

