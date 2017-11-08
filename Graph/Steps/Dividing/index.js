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
  DIVIDING_STEP,
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
    this.props.toggleSelectMode(DIVIDING_STEP, selection);
  }

  renderError(err) {
    return err && this.props.submitFailed
      ? <p className="has-error__text">{err}</p>
      : <span />;
  }

  render() {
    const {
      customerSelected,
      notebookHasDateRange,
      datasetSource,
      toggleSelectMode,
      datasetConnectedNodes,
      selection,
      syncErrors = {},
      handleSubmit,
    } = this.props;

    return (
      <div className="section__item">
        <div className="section-details__row">
          <div className="section-details__col" style={{ width: '80%' }}>
            <h5 className="section-details__title">Dividing</h5>
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
                <h6 className="text-center">Divider notebook</h6>
                <Field
                  name="notebook"
                  component={props =>
                    <SelectInput
                      {...props}
                      placeholder="Predictive notebook"
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
              {
                notebookHasDateRange
                  ? <li>
                    <h6 className="text-center">Date range</h6>
                    <Field
                      name="dateRange"
                      component={props =>
                        (<DatePicker
                          className="a-field-input"
                          selected={props.input.value}
                          onChange={value => props.input.onChange(value)}
                        />)
                      }
                    />
                  </li>
                  : ''
              }
              <li>
                <h6 className="text-center">Source of DataSets</h6>
                <Field
                  name="datasetSource"
                  component={props =>
                    <SelectInput
                      {...props}
                      placeholder="Source of Datasets"
                      className="a-sections-select"
                      multi={false}
                      clearable={false}
                      options={customerSelected ? [{
                          value: 'DATASET',
                          label: 'Dataset',
                        }, {
                          value: 'GRAPH_SELECT',
                          label: 'Other step',
                        }] : [{
                          value: 'DATASET',
                          label: 'Dataset',
                        }]
                      }
                    />
                  }
                />
              </li>
              { datasetSource && datasetSource === 'DATASET'
                ? <li>
                  <h6 className="text-center">Extenstion dataset</h6>
                  <Field
                    name="extensionDatasetId"
                    component={props =>
                      <SelectInput
                        {...props}
                        placeholder="DataSet Type"
                        className="a-sections-select"
                        multi={false}
                        clearable={false}
                        options={[{
                          value: 'CANNONICAL_DATASET',
                          label: 'Extenstion dataset 1',
                        }, {
                          value: 'CUSTOMERS_DATASET',
                          label: 'Extenstion dataset 2',
                        }]}
                      />
                    }
                  />
                </li>
                : ''
              }
              { datasetSource && datasetSource === 'DATASET'
                ? <li>
                  <h6 className="text-center">Customer dataset</h6>
                  <Field
                    name="customersDatasetId"
                    component={props =>
                      <SelectInput
                        {...props}
                        placeholder="DataSet Type"
                        className="a-sections-select"
                        multi={false}
                        clearable={false}
                        options={[{
                          value: 'CANNONICAL_DATASET',
                          label: 'Customer dataset 1',
                        }, {
                          value: 'CUSTOMERS_DATASET',
                          label: 'Customer dataset 2',
                        }]}
                      />
                    }
                  />
                </li>
                : ''
              }
              { datasetSource && datasetSource === 'DATASET'
                ? <li>
                  <h6 className="text-center">Cannonical dataset</h6>
                  <Field
                    name="canonnicalDatasetId"
                    component={props =>
                      <SelectInput
                        {...props}
                        placeholder="DataSet Type"
                        className="a-sections-select"
                        multi={false}
                        clearable={false}
                        options={[{
                          value: 'CANNONICAL_DATASET',
                          label: 'Cannonical dataset 1',
                        }, {
                          value: 'CUSTOMERS_DATASET',
                          label: 'Cannonical dataset 2',
                        }]}
                      />
                    }
                  />
                </li>
                : ''
              }
              {
                datasetSource && datasetSource === 'GRAPH_SELECT'
                  ? <li>
                    <h6 className="text-center">Selected step for extenstion dataset</h6>
                    <h6 className="text-center">
                      <strong>
                        {datasetConnectedNodes.map(({ meta }) => meta.title).join()}
                      </strong>
                    </h6>
                    <button
                      className="btn"
                      style={{ margin: 'auto' }}
                      onClick={() => this.toggleSelectMode('datasetConnectedNodes')}
                    >
                      {
                        selection.type === 'datasetConnectedNodes'
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

const selector = formValueSelector(DIVIDING_STEP);
const rootSelector = formValueSelector(ROOT_FORM);

export default reduxForm({
  form: DIVIDING_STEP,
  validate,
  fields: [
    'title',
    'notebook',
    'dateRange',
    'datasetSource',
    'extensionDatasetId',
    'canonnicalDatasetId',
    'customersDatasetId',
    'datasetConnectedNodes',
  ],
  onSubmit: submit,
})(connect(
  (state, props) => ({
    ...props,
    syncErrors: getFormSyncErrors(DIVIDING_STEP)(state),
    customerSelected: rootSelector(state, 'customer'),

    datasetSource: selector(state, 'datasetSource'),
    notebookHasDateRange: selector(state, 'notebook') % 2 === 0,
    datasetConnectedNodes: selector(state, 'datasetConnectedNodes') || [],
    selection: state.pipeline.currentStep.form === DIVIDING_STEP ? state.pipeline.currentStep :
      {
        type: null,
      },
  })
)(TrainingForm));

