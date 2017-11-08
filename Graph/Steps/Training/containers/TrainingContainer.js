import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Field,
  reduxForm,
  formValueSelector,
  getFormSyncErrors,
} from 'redux-form';

import {
  TRAINING_STEP,
  ROOT_FORM
} from '../../../names';

import submit from './../components/submit';

import SelectInput from '../../../../../../Shared/common/components/Select/SelectInput';

import SelectSource from './../../helpers/SelectSource';

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
    this.props.toggleSelectMode(TRAINING_STEP, selection);
  }

  renderError(err) {
    return err && this.props.submitFailed
      ? <p className="has-error__text">{err}</p>
      : <span />;
  }

  render() {
    const {
      notebookHasTrainingModel,
      handleSubmit,
      datasetSource,
      extensionDatasetSource,
      extensionDatasetSourceSelectedNodes,
      datasetSourceSelectedNodes,
      customerSelected,
      notebookHasExtensionDataset,
      toggleSelectMode,
      selection,
      syncErrors = {},
    } = this.props;

    return (
      <div className="section__item">
        <div className="section-details__row">
          <div className="section-details__col" style={{ width: '80%' }}>
            <h5 className="section-details__title">Training</h5>
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
                <h6 className="text-center">Predictive notebook</h6>
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
                        name: 'Notebook with model',
                      }].map(lang => ({
                        value: lang.id,
                        label: lang.name,
                      }))}
                    />
                  }
                />
              </li>
              {
                notebookHasTrainingModel
                  ? <li>
                    <h6 className="text-center">Training Model</h6>
                    <Field
                      name="trainingModel"
                      component={props =>
                        <SelectInput
                          {...props}
                          placeholder="Training Model"
                          className="a-sections-select"
                          multi={false}
                          clearable={false}
                          options={[{
                            id: 1,
                            name: 'Model 1',
                          }, {
                            id: 2,
                            name: 'Model',
                          }].map(lang => ({
                            value: lang.id,
                            label: lang.name,
                          }))}
                        />
                      }
                    />
                  </li>
                  : ''
              }
              { notebookHasExtensionDataset
                ? <li>
                  <h6 className="text-center">Source of extension Datasets</h6>
                  <Field
                    name="extensionDatasetSource"
                    component={props =>
                      <SelectInput
                        {...props}
                        placeholder="Source of extension Datasets"
                        className="a-sections-select"
                        multi={false}
                        clearable={false}
                        options={[{
                          value: 'EXTENSION_DATASET',
                          label: 'Extension Dataset',
                        }, {
                          value: 'GRAPH_SELECT',
                          label: 'Input resultOf',
                        }]}
                      />
                    }
                  />
                </li>
                : ''
              }
              {
                extensionDatasetSource
                  ? extensionDatasetSource === 'EXTENSION_DATASET'
                    ? <li>
                      <h6 className="text-center">Extension dataset</h6>
                      <Field
                        name="extensionDatasetId"
                        component={props =>
                          (<SelectInput
                            {...props}
                            placeholder="Select extension dataset"
                            className="a-sections-select"
                            multi={false}
                            clearable={false}
                            options={[{
                              id: 1,
                              name: 'Dataset 1',
                            }, {
                              id: 2,
                              name: 'Dataset 2',
                            }].map(lang => ({
                              value: lang.id,
                              label: lang.name,
                            }))}
                          />)
                        }
                      />
                    </li>
                    : <li>
                      <h6 className="text-center">Selected step for extenstion dataset</h6>
                      <h6 className="text-center">
                        <strong>
                          {extensionDatasetSourceSelectedNodes.map(({meta}) => meta.title).join()}
                        </strong>
                      </h6>
                      <button
                        className="btn"
                        style={{ margin: 'auto' }}
                        onClick={() => this.toggleSelectMode('extensionDatasetSourceSelectedNodes')}
                      >
                        {
                          selection.type === 'extensionDatasetSourceSelectedNodes'
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
                  ?  customerSelected
                    ? <li>
                      <h6 className="text-center">DataSet Type</h6>
                      <Field
                        name="datasetSourceType"
                        component={props =>
                          <SelectInput
                            {...props}
                            placeholder="DataSet Type"
                            className="a-sections-select"
                            multi={false}
                            clearable={false}
                            options={[{
                              value: 'CANNONICAL_DATASET',
                              label: 'Cannonical Dataset',
                            }, {
                              value: 'CUSTOMERS_DATASET',
                              label: 'Cannonical Dataset',
                            }]}
                          />
                        }
                      />
                    </li>
                    : ''
                  : <li>
                    <h6 className="text-center">Selected nodes</h6>
                    <h6 className="text-center">
                      <strong>
                        {datasetSourceSelectedNodes.map(({meta}) => meta.title).join()}
                      </strong>
                    </h6>
                    <button
                      className="btn"
                      style={{ margin: 'auto' }}
                      onClick={() => this.toggleSelectMode('datasetSourceSelectedNodes')}
                    >
                      {
                        selection.type === 'datasetSourceSelectedNodes'
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
    )
  }
}

const selector = formValueSelector(TRAINING_STEP);
const rootSelector = formValueSelector(ROOT_FORM);

export default reduxForm({
  form: TRAINING_STEP,
  validate,
  fields: [
    'title',
    'notebook',
    'trainingModel',
    'extensionDatasetSource',
    'extensionDatasetSourceSelectedNodes',
    'extensionDatasetId',
    'datasetSource',
    'datasetSourceType',
    'datasetSourceSelectedNodes',
  ],
  onSubmit: submit,
})(connect(
  (state, props) => ({
    ...props,
    syncErrors: getFormSyncErrors(TRAINING_STEP)(state),
    extensionDatasetSource: selector(state, 'extensionDatasetSource'),
    extensionDatasetSourceSelectedNodes: selector(state, 'extensionDatasetSourceSelectedNodes') || [],
    datasetSourceSelectedNodes: selector(state, 'datasetSourceSelectedNodes') || [],
    datasetSource: selector(state, 'datasetSource'),
    customerSelected: rootSelector(state, 'customer'),
    notebookHasExtensionDataset: selector(state, 'notebook') % 2 === 1,
    notebookHasTrainingModel: selector(state, 'notebook') % 2 === 0,
    selection: state.pipeline.currentStep.form === TRAINING_STEP ? state.pipeline.currentStep :
      {
        type: null,
      },
  })
)(TrainingForm));

