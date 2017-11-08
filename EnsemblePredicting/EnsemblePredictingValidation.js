import { FIELD_NAMES } from './EnsemblePredictingModel/EnsemblePredictingModel';

const validate = (values, { optionHolders }) => {
  const errors = {};

  if (!values[FIELD_NAMES.name]) {
    errors[FIELD_NAMES.name] = 'Name is required field';
  }

  if (!values[FIELD_NAMES.description]) {
    errors[FIELD_NAMES.description] = 'Description is required field';
  }

  if (!values[FIELD_NAMES.category]) {
    errors[FIELD_NAMES.category] = 'Category is required field';
  }

  if (!values[FIELD_NAMES.solution]) {
    errors[FIELD_NAMES.solution] = 'Solution is required field';
  }

  if (!values[FIELD_NAMES.originalDataset]) {
    errors[FIELD_NAMES.originalDataset] = 'Dataset is required field';
  }


  if (!values[FIELD_NAMES.ensembleNotebook]) {
    errors[FIELD_NAMES.ensembleNotebook] = 'Select Ensemble Notebook';
  }

  if (!values[FIELD_NAMES.predictionPipeline] || !values[FIELD_NAMES.predictionPipeline].length) {
    errors[FIELD_NAMES.predictionPipeline] = 'Select at least one prediction pipeline';
  }

  // if (!values[FIELD_NAMES.resultOfEnsembleTesting] || !values[FIELD_NAMES.resultOfEnsembleTesting.length]) {
  //   errors[FIELD_NAMES.resultOfEnsembleTesting] = 'Select at least one prediction pipeline';
  // }


  return errors;
};

export default validate;
