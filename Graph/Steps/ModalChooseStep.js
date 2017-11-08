import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import {
  TRAINING_STEP,
  DIVIDING_STEP,
  CLEANING_OR_MAPPING_STEP,
  TESTING_OR_PREDICTING_STEP,
  EVALUATION_STEP,
  ENSEMBLING_STEP,
  ROOT_FORM
} from '../names';

import ModalWindow from '../../../../Shared/common/components/ModalWindow/ModalWindow';

const types =  [{
  label: 'Training step',
  type: TRAINING_STEP,
}, {
  label: 'Dividing step',
  type: DIVIDING_STEP,
}, {
  label: 'Cleaning or mapping step',
  type: CLEANING_OR_MAPPING_STEP,
}, {
  label: 'Testing or predicting step',
  type: TESTING_OR_PREDICTING_STEP,
}, {
  label: 'Evaluation step',
  type: EVALUATION_STEP,
}, {
  label: 'Ensembling step',
  type: ENSEMBLING_STEP,
}]

class ModalChooseStep extends PureComponent {
  getPossibleStepTypes() {
    return this.props.hasCustomer
      ? types
      : types.filter(({ type }) => type !== CLEANING_OR_MAPPING_STEP);
  }

  render() {
    const { isOpen, onClose, onChoose } = this.props;
    return (
      <ModalWindow
        closeWindowRequest={onClose}
        onRequestClose={onClose}
        isOpen={isOpen}
        contentLabel="choose-step-modal"
        title="Choose step type"
      >
        <div>
          {this.getPossibleStepTypes().map(({ label, type }) => (
            <div className="modal-body__btns-row modal-body__btns-row--last p-t-none" key={type}>
              <button className="modal-body__btn modal-body__btn--blue" onClick={() => onChoose(type)}>
                {label}
              </button>
            </div>
          ))}

          <div className="modal-body__btns-row modal-body__btns-row--last p-t-none">
            <button className="modal-body__btn modal-body__btn--blue" onClick={onClose}>Close</button>
          </div>
        </div>
      </ModalWindow>
    );
  }
}

const rootSelector = formValueSelector(ROOT_FORM);

export default connect(state => ({
  hasCustomer: formValueSelector(state, 'customer'),
}))(ModalChooseStep);
