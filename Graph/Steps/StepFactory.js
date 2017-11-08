import React, { PureComponent } from 'react';

import TrainingStep from './Training/containers/TrainingContainer';
import DividingStep from './Dividing';
import CleaningOrMappingStep from './CleaningOrMapping';
import TestingOrPredictingStep from './TestingOrPredicting';
import EvaluationStep from './Evaluation';
import EnsemblingStep from './Ensembling';

import {
  TRAINING_STEP,
  DIVIDING_STEP,
  CLEANING_OR_MAPPING_STEP,
  TESTING_OR_PREDICTING_STEP,
  EVALUATION_STEP,
  ENSEMBLING_STEP,
} from '../names';

const name2component = {
  [TRAINING_STEP]: TrainingStep,
  [DIVIDING_STEP]: DividingStep,
  [CLEANING_OR_MAPPING_STEP]: CleaningOrMappingStep,
  [TESTING_OR_PREDICTING_STEP]: TestingOrPredictingStep,
  [EVALUATION_STEP]: EvaluationStep,
  [ENSEMBLING_STEP]: EnsemblingStep,
};

class StepFactory extends PureComponent {
  render() {
    const { type } = this.props;
    return React.createElement(name2component[type], this.props);
  }
}

export default StepFactory;
