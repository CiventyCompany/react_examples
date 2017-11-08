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
  CLEANING_OR_MAPPING_STEP,
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
    this.props.toggleSelectMode(CLEANING_OR_MAPPING_STEP, selection);
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
            <h5 className="section-details__title">Cleaning or mapping</h5>
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
                <h6 className="text-center">Cleaning or mapping RFS.</h6>
                <Field
                  name="rfc"
                  component={props =>
                    <SelectInput
                      {...props}
                      placeholder="Request for solution"
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
                <h6 className="text-center">Clean or map Notebook.</h6>
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
              <li>
                <h6 className="text-center">Input Dataset</h6>
                <Field
                  name="dataset"
                  component={props =>
                    <SelectInput
                      {...props}
                      placeholder="Dataset"
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
                    />
                  }
                />
              </li>
            </ul>
            <button className="btn" onClick={handleSubmit}>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

const selector = formValueSelector(CLEANING_OR_MAPPING_STEP);
const rootSelector = formValueSelector(ROOT_FORM);

export default reduxForm({
  form: CLEANING_OR_MAPPING_STEP,
  validate,
  fields: [
    'title',
    'notebook',
    'dataset',
    'rfc'
  ],
  onSubmit: submit,
})(connect(
  (state, props) => ({
    ...props,
    syncErrors: getFormSyncErrors(CLEANING_OR_MAPPING_STEP)(state),
  })
)(TrainingForm));

