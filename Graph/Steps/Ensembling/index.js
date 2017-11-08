import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';

import { connect } from 'react-redux';

import {
  Field,
  reduxForm,
  formValueSelector,
  getFormSyncErrors,
} from 'redux-form';

import {
  ENSEMBLING_STEP,
  ROOT_FORM,
} from '../../names';

import submit from './submit';

import SelectInput from '../../../../../Shared/common/components/Select/SelectInput';

import SelectSource from '../helpers/SelectSource';

const validate = (values) => {
  const errors = {};

  return errors;
};

class TrainingForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggleSelectMode = this.toggleSelectMode.bind(this);
  }

  toggleSelectMode(selection) {
    this.props.toggleSelectMode(ENSEMBLING_STEP, selection);
  }

  renderError(err) {
    return err && this.props.submitFailed
      ? <p className="has-error__text">{err}</p>
      : <span />;
  }

  render() {
    const {
      stepsEnsembling,
      selection,
      syncErrors = {},
      handleSubmit,
    } = this.props;

    return (
      <div className="section__item">
        <div className="section-details__row">
          <div className="section-details__col" style={{ width: '80%' }}>
            <h5 className="section-details__title">Ensembling</h5>
            <ul className="a-sections a-sections--blocks" >
              <li>
                <h6 className="text-center">Step Name</h6>
                <Field
                  name="title"
                  className="a-field-input"
                  component="input"
                  placeholder="Enter title"
                  type="text"
                />
              </li>
              <li>
                <h6 className="text-center">Ensembling Notebook.</h6>
                <Field
                  name="notebook"
                  component={props =>
                    <SelectInput
                      {...props}
                      placeholder="Ensembling Notebook."
                      className="a-sections-select"
                      multi={false}
                      clearable={false}
                      options={[{
                        id: 1,
                        name: 'Notebook 1',
                      }, {
                        id: 2,
                        name: 'Notebook with date',
                      }].map(lang => ({
                        value: lang.id,
                        label: lang.name,
                      }))}
                    />
                  }
                />
              </li>
              <li>
                <h6 className="text-center">Selected steps for ensembling</h6>
                <h6 className="text-center">
                  <strong>
                    {stepsEnsembling.map(({ meta }) => meta.title).join()}
                  </strong>
                </h6>
                <button
                  className="btn"
                  style={{ margin: 'auto' }}
                  onClick={() => this.toggleSelectMode('stepsEnsembling')}
                >
                  {
                    selection.type === 'stepsEnsembling'
                      ? 'Disable selection'
                      : 'Enable selection'
                  }
                </button>
              </li>
            </ul>
            <button className="btn" onClick={handleSubmit}>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector(ENSEMBLING_STEP);

export default reduxForm({
  form: ENSEMBLING_STEP,
  validate,
  fields: [
    'title',
    'notebook',
    'stepsEnsembling',
  ],
  onSubmit: submit,
})(connect(
  (state, props) => ({
    ...props,
    syncErrors: getFormSyncErrors(ENSEMBLING_STEP)(state),
    stepsEnsembling: selector(state, 'stepsEnsembling') || [],
    selection: state.pipeline.currentStep.form === ENSEMBLING_STEP ? state.pipeline.currentStep :
      {
        type: null,
      },
  })
)(TrainingForm));

