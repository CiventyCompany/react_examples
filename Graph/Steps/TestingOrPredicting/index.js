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
  TESTING_OR_PREDICTING_STEP,
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
    this.props.toggleSelectMode(TESTING_OR_PREDICTING_STEP, selection);
  }

  renderError(err) {
    return err && this.props.submitFailed
      ? <p className="has-error__text">{err}</p>
      : <span />;
  }

  render() {
    const {
      trainedModelSource,
      traindeModelSelectedNodes,
      extensionDatasetSource,
      extensionDatasetSelectedNodes,
      datasetSource,
      datasetSelectedNodes,
      selection,
      syncErrors = {},
      handleSubmit,
    } = this.props;

    return (
      <div className="section__item">
        <div className="section-details__row">
          <div className="section-details__col" style={{ width: '80%' }}>
            <h5 className="section-details__title">Testing or predicting</h5>
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
                <h6 className="text-center">Source of Trained Model </h6>
                <Field
                  name="trainedModelSource"
                  component={props =>
                    <SelectInput
                      {...props}
                      placeholder="Source of Extension Datasets"
                      className="a-sections-select"
                      multi={false}
                      clearable={false}
                      options={[{
                        value: 'DATASET',
                        label: 'Dataset',
                      }, {
                        value: 'GRAPH_SELECT',
                        label: 'Input resultOf',
                      }]}
                    />
                  }
                />
              </li>
              { trainedModelSource
                ? trainedModelSource === 'DATASET'
                  ? <li>
                    <h6 className="text-center">Trained Model</h6>
                    <Field
                      name="trainedModelId"
                      component={props =>
                        <SelectInput
                          {...props}
                          placeholder="Extenstion DataSet"
                          className="a-sections-select"
                          multi={false}
                          clearable={false}
                          options={[{
                            value: 1,
                            label: 'Extenstion DataSet 1',
                          }, {
                            value: 2,
                            label: 'Extenstion DataSet 2',
                          }]}
                        />
                      }
                    />
                  </li>
                  : <li>
                    <h6 className="text-center">Selected nodes</h6>
                    <h6 className="text-center">
                      <strong>
                        {traindeModelSelectedNodes.map(({meta}) => meta.title).join()}
                      </strong>
                    </h6>
                    <button
                      className="btn"
                      style={{ margin: 'auto' }}
                      onClick={() => this.toggleSelectMode('traindeModelSelectedNodes')}
                    >
                      {
                        selection.type === 'traindeModelSelectedNodes'
                          ? 'Disable selection'
                          : 'Enable selection'
                      }
                    </button>
                  </li>
                : ''
              }
              <li>
                <h6 className="text-center">Source of Extension DataSet</h6>
                <Field
                  name="extensionDatasetSource"
                  component={props =>
                    <SelectInput
                      {...props}
                      placeholder="Source of Extension Datasets"
                      className="a-sections-select"
                      multi={false}
                      clearable={false}
                      options={[{
                        value: 'DATASET',
                        label: 'Dataset',
                      }, {
                        value: 'GRAPH_SELECT',
                        label: 'Input resultOf',
                      }]}
                    />
                  }
                />
              </li>
              { extensionDatasetSource
                ? extensionDatasetSource === 'DATASET'
                  ? <li>
                    <h6 className="text-center">Extenstion DataSet</h6>
                    <Field
                      name="extensionDatasetId"
                      component={props =>
                        <SelectInput
                          {...props}
                          placeholder="Extenstion DataSet"
                          className="a-sections-select"
                          multi={false}
                          clearable={false}
                          options={[{
                            value: 1,
                            label: 'Extenstion DataSet 1',
                          }, {
                            value: 2,
                            label: 'Extenstion DataSet 2',
                          }]}
                        />
                      }
                    />
                  </li>
                  : <li>
                    <h6 className="text-center">Selected nodes</h6>
                    <h6 className="text-center">
                      <strong>
                        {extensionDatasetSelectedNodes.map(({ meta }) => meta.title).join()}
                      </strong>
                    </h6>
                    <button
                      className="btn"
                      style={{ margin: 'auto' }}
                      onClick={() => this.toggleSelectMode('extensionDatasetSelectedNodes')}
                    >
                      {
                        selection.type === 'extensionDatasetSelectedNodes'
                          ? 'Disable selection'
                          : 'Enable selection'
                      }
                    </button>
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
                      options={[{
                        value: 'DATASET',
                        label: 'Dataset',
                      }, {
                        value: 'GRAPH_SELECT',
                        label: 'Input resultOf',
                      }]}
                    />
                  }
                />
              </li>
              { datasetSource
                ? datasetSource === 'DATASET'
                  ? <li>
                    <h6 className="text-center">DataSet Type</h6>
                    <Field
                      name="datasetId"
                      component={props =>
                        <SelectInput
                          {...props}
                          placeholder="DataSet Type"
                          className="a-sections-select"
                          multi={false}
                          clearable={false}
                          options={[{
                            value: 1,
                            label: 'Dataset 1',
                          }, {
                            value: 2,
                            label: 'Dataset 2',
                          }]}
                        />
                      }
                    />
                  </li>
                  : <li>
                    <h6 className="text-center">Selected nodes</h6>
                    <h6 className="text-center">
                      <strong>
                        {datasetSelectedNodes.map(({meta}) => meta.title).join()}
                      </strong>
                    </h6>
                    <button
                      className="btn"
                      style={{ margin: 'auto' }}
                      onClick={() => this.toggleSelectMode('datasetSelectedNodes')}
                    >
                      {
                        selection.type === 'datasetSelectedNodes'
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

const selector = formValueSelector(TESTING_OR_PREDICTING_STEP);

export default reduxForm({
  form: TESTING_OR_PREDICTING_STEP,
  validate,
  fields: [
    'title',
    'trainedModelSource',
    'trainedModelId',
    'traindeModelSelectedNodes',
    'extensionDatasetSource',
    'extensionDatasetId',
    'extensionDatasetSelectedNodes',
    'datasetSource',
    'datasetId',
    'datasetSelectedNodes',
  ],
  onSubmit: submit,
})(connect(
  (state, props) => ({
    ...props,
    syncErrors: getFormSyncErrors(TESTING_OR_PREDICTING_STEP)(state),
    trainedModelSource: selector(state, 'trainedModelSource'),
    traindeModelSelectedNodes: selector(state, 'traindeModelSelectedNodes') || [],
    extensionDatasetSource: selector(state, 'extensionDatasetSource'),
    extensionDatasetSelectedNodes: selector(state, 'extensionDatasetSelectedNodes') || [],
    datasetSource: selector(state, 'datasetSource'),
    datasetSelectedNodes: selector(state, 'datasetSelectedNodes') || [],
    selection: state.pipeline.currentStep.form === TESTING_OR_PREDICTING_STEP ? state.pipeline.currentStep :
      {
        type: null,
      },
  })
)(TrainingForm));

