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
  EVALUATION_STEP,
  ROOT_FORM,
} from '../../names';

import submit from './submit';

import SelectInput from '../../../../../Shared/common/components/Select/SelectInput';

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
    this.props.toggleSelectMode(EVALUATION_STEP, selection);
  }

  renderError(err) {
    return err && this.props.submitFailed
      ? <p className="has-error__text">{err}</p>
      : <span />;
  }

  render() {
    const {
      hasSubSolution,
      predictionSource,
      predictionSelectedNodes,
      selection,
      syncErrors = {},
      handleSubmit,
    } = this.props;

    return (
      <div className="section__item">
        <div className="section-details__row">
          <div className="section-details__col" style={{ width: '80%' }}>
            <h5 className="section-details__title">Evaluation</h5>
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
                <h6 className="text-center">Evaluation notebook</h6>
                <Field
                  name="notebook"
                  component={props =>
                    <SelectInput
                      {...props}
                      placeholder="Evaluation notebook"
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
                <h6 className="text-center">Summary</h6>
                <Field
                  name="summary"
                  className="a-field-input"
                  component="textarea"
                />
              </li>
              {
                hasSubSolution && <li>
                  <h6 className="text-center">Source of Prediction</h6>
                  <Field
                    name="predictionSource"
                    component={props =>
                      <SelectInput
                        {...props}
                        placeholder="Source of Prediction"
                        className="a-sections-select"
                        multi={false}
                        clearable={false}
                        options={[{
                          value: 'DATASET',
                          label: 'Input Pipeline.',
                        }, {
                          value: 'GRAPH_SELECT',
                          label: 'Other step',
                        }]}
                      />
                    }
                  />
                </li>
              }

              { predictionSource && predictionSource === 'DATASET'
                ? <li>
                  <h6 className="text-center">Pipelines</h6>
                  <Field
                    name="predictionPipelines"
                    component={props =>
                      <SelectInput
                        {...props}
                        placeholder="Pipelines"
                        className="a-sections-select"
                        clearable={false}
                        multi
                        options={[{
                          value: 1,
                          label: 'Pipeline 1',
                        }, {
                          value: 2,
                          label: 'Pipeline 2',
                        }, {
                          value: 3,
                          label: 'Pipeline 3',
                        }, {
                          value: 4,
                          label: 'Pipeline 4',
                        }]}
                      />
                    }
                  />
                </li>
                : ''
              }

              {
                !hasSubSolution || (predictionSource && predictionSource === 'GRAPH_SELECT')
                  ? <li>
                    <h6 className="text-center">Selected step for extenstion dataset</h6>
                    <h6 className="text-center">
                      <strong>
                        {predictionSelectedNodes.map(({ meta }) => meta.title).join()}
                      </strong>
                    </h6>
                    <button
                      className="btn"
                      style={{ margin: 'auto' }}
                      onClick={() => this.toggleSelectMode('predictionSelectedNodes')}
                    >
                      {
                        selection.type === 'predictionSelectedNodes'
                          ? 'Disable selection'
                          : 'Enable selection'
                      }
                    </button>
                  </li>
                  : ''
              }
            </ul>
            <button className="btn" onClick={handleSubmit}>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector(EVALUATION_STEP);
const rootSelector = formValueSelector(ROOT_FORM);

export default reduxForm({
  form: EVALUATION_STEP,
  validate,
  fields: [
    'title',
    'notebook',
    'summary',
    'predictionSource',
    'predictionPipelines',
    'predictionSelectedNodes',
  ],
  onSubmit: submit,
})(connect(
  (state, props) => ({
    ...props,
    syncErrors: getFormSyncErrors(EVALUATION_STEP)(state),
    hasSubSolution: rootSelector(state, 'subSolution'),
    predictionSource: selector(state, 'predictionSource'),
    predictionSelectedNodes: selector(state, 'predictionSelectedNodes') || [],
    selection: state.pipeline.currentStep.form === EVALUATION_STEP ? state.pipeline.currentStep :
      {
        type: null,
      },
  })
)(TrainingForm));

