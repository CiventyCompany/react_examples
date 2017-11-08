import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import {
  ENSEMBLE_TRAINING,
} from '../formNames';

import PropTypes from 'prop-types';
import Spinner from '../../../../..//Shared/common/components/Spinner/Admin';

class RunModalContent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { openSuccessModal, errors, submitting } = this.props;
    return (
      <div className="text-container">
        {!submitting && errors.length
          ? <p>
            There is a problem with a folowing fields: {errors.join(', ')}
          </p>
          : ''
        }
        {
          !submitting && !errors.length
            ? <p>
              Form ready to create!
            </p>
            : ''
        }
        {
          submitting ? <Spinner /> : ''
        }
        {submitting || errors.length ? '' : <div className="modal-body__btns-row modal-body__btns-row--last p-t-none">
          <button className="modal-body__btn modal-body__btn--blue" onClick={() => openSuccessModal()}>Create</button>
        </div> }
      </div>
    );
  }
}

const selector = formValueSelector(ENSEMBLE_TRAINING);

const fields = [];

export default connect(
  (state, ownProps) => {
    const sections = fields.map(field => ({
      label: field.msg,
      value: selector(state, field.name),
    })).filter(field => !!field.value);

    const errorsRaw = state.create.currentErrors;
    const errors = Object.keys(errorsRaw).map((key) => {
      if (errorsRaw[key].length) {
        return key;
      }
    }).filter(err => !!err);
    return {
      errors,
      sections,
      submitting: state.create.submitting,
      sections: state.create.sections,
      currentSection: state.create.currentSection,
    };
  },
  (dispatch, props) => ({}),
)(RunModalContent);
