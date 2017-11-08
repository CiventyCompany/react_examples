import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import {
  reduxForm,
  formValueSelector,
  getFormSyncErrors,
} from 'redux-form';

import {
  spySelectionValue,
} from '../../../../actions/create';

import {
  ENSEMBLE_PREDICTING,
} from '../formNames';

import {
  FIELD_NAMES,
} from './EnsemblePredictingModel/EnsemblePredictingModel';

import optionsAdapters from '../optionsAdapters';

import submit from './EnsemblePredictingSubmit';
import validate from './EnsemblePredictingValidation';

import AdminCreateForm from '../AdminCreateForm';
import AdminFormSelect from '../../../../components/AdminFormSelect';
import AdminFormInput from '../../../../components/AdminFormInput';


class EnsemblePredictingForm extends AdminCreateForm {
  render() {
    const {
      handleSubmit,

      solutionCategories,
      solutions,
      subSolutions,
      originalDatasets,

      ensembleNotebooks,
      ensembleNotebookTrainedModels,
      predictionPipelines,
      resultsOfEnsembleTesting,

      syncErrors = {},
      error,
      submitFailed,
    } = this.props;

    return (
      <div className={classnames('has-error--static', {
        'has-error--hide': !submitFailed,
      })}
      >
        { submitFailed && error
          ? <span className={classnames('a-sections__title', { 'has-error__text': true })}>
            { error }
          </span>
          : ''
        }
        <ul className="a-sections" >
          <AdminFormInput
            title="Name"
            name={FIELD_NAMES.name}
            errorHolder={syncErrors}
          />
          <AdminFormInput
            title="Description"
            name={FIELD_NAMES.description}
            component="textarea"
            errorHolder={syncErrors}
          />
          <AdminFormSelect
            title="Category"
            name={FIELD_NAMES.category}
            dataHolder={solutionCategories}
            optionsMapper={optionsAdapters.category2selectOption}
            errorHolder={syncErrors}
            logChange={this.logChange}
          />
          <AdminFormSelect
            title="Solution"
            name={FIELD_NAMES.solution}
            dataHolder={solutions}
            optionsMapper={optionsAdapters.category2selectOption}
            errorHolder={syncErrors}
            logChange={this.logChange}
          />

          <AdminFormSelect
            title="Sub-Solution"
            name={FIELD_NAMES.subSolution}
            dataHolder={subSolutions}
            optionsMapper={optionsAdapters.category2selectOption}
            errorHolder={syncErrors}
            logChange={this.logChange}
          />

          <AdminFormSelect
            title="Original Dataset"
            name={FIELD_NAMES.originalDataset}
            dataHolder={originalDatasets}
            optionsMapper={optionsAdapters.category2selectOption}
            errorHolder={syncErrors}
            logChange={this.logChange}
          />

          <AdminFormSelect
            title="Ensemble Notebook"
            name={FIELD_NAMES.ensembleNotebook}
            dataHolder={ensembleNotebooks}
            optionsMapper={optionsAdapters.category2selectOption}
            errorHolder={syncErrors}
            logChange={this.logChange}
          />

          <AdminFormSelect
            title="Ensemble Notebook's Trained Models"
            name={FIELD_NAMES.ensembleNotebooksTrainedModels}
            dataHolder={ensembleNotebookTrainedModels}
            optionsMapper={optionsAdapters.category2selectOption}
            errorHolder={syncErrors}
            logChange={this.logChange}
          />

          <AdminFormSelect
            title="Prediction Pipeline"
            name={FIELD_NAMES.predictionPipeline}
            dataHolder={predictionPipelines}
            optionsMapper={optionsAdapters.category2selectOption}
            errorHolder={syncErrors}
            logChange={this.logChange}
            multi
          />

          <AdminFormSelect
            title="Results Of Ensemble Testing"
            name={FIELD_NAMES.resultOfEnsembleTesting}
            dataHolder={resultsOfEnsembleTesting}
            optionsMapper={optionsAdapters.category2selectOption}
            errorHolder={syncErrors}
            logChange={this.logChange}
            multi
          />

        </ul>
        <div className="a-btns">
          <span className="a-btn a-btn-primary" role="button" onClick={handleSubmit}>Create</span>
        </div>
      </div>
    );
  }
}

EnsemblePredictingForm.FORM_NAME = ENSEMBLE_PREDICTING;

EnsemblePredictingForm.propTypes = {
  solutionCategories: AdminCreateForm.propTypes.dataHolder,
  solutions: AdminCreateForm.propTypes.dataHolder,
  subSolutions: AdminCreateForm.propTypes.dataHolder,
  originalDatasets: AdminCreateForm.propTypes.dataHolder,

  ensembleNotebooks: AdminCreateForm.propTypes.dataHolder,
  ensembleNotebookTrainedModels: AdminCreateForm.propTypes.dataHolder,
  predictionPipelines: AdminCreateForm.propTypes.dataHolder,
  resultsOfEnsembleTesting: AdminCreateForm.propTypes.dataHolder,
};

const selector = formValueSelector(ENSEMBLE_PREDICTING);

export default reduxForm({
  form: ENSEMBLE_PREDICTING,
  validate,
  fields: AdminCreateForm.getFieldNamesValues(FIELD_NAMES),
  onSubmit: submit,
})(connect(
  (state, props) => ({
    ...props,
    ...AdminCreateForm.resolveDataHolders(state),

    error: getFormSyncErrors(ENSEMBLE_PREDICTING),

    syncErrors: getFormSyncErrors(ENSEMBLE_PREDICTING)(state),
  }), {
    spySelectionValue,
  },
)(EnsemblePredictingForm));

