import React, { PureComponent } from 'react';

import StepFactory from './StepFactory';

import ModalChooseStep from './ModalChooseStep';

class AddStep extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: false,
      modalChooseOpen: false,
    };

    this.toggleAdd = this.toggleAdd.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  toggleAdd(type) {
    this.closeModal();
    this.setState({
      currentStep: type,
    });
  }

  cancelAdd() {
    this.setState({
      currentStep: null,
    });
  }

  openModal() {
    this.setState({
      modalChooseOpen: true,
    })
  }

  closeModal() {
    this.setState({
      modalChooseOpen: false,
    });
  }

  renderAddStep() {
    return (<div>
      <div
        role="button"
        style={{ margin: '20px 5px', width: '80%' }}
        tabIndex="-1"
        className="btn"
        onClick={this.openModal}
      >
        Add step
      </div>
      <ModalChooseStep
        isOpen={this.state.modalChooseOpen}
        onClose={this.closeModal}
        onChoose={this.toggleAdd}
      />
    </div>);
  }

  renderCancelAdd() {
    return (<div
      role="button"
      style={{ margin: '20px 5px', width: '80%' }}
      tabIndex="-1"
      className="btn"
      onClick={this.cancelAdd}
    >
      Cancel
    </div>);
  }

  renderForm() {
    return (<StepFactory
      type={this.state.currentStep}
      onDone={this.toggleAdd}
      toggleSelectMode={this.props.toggleSelectMode}
      addNode={this.props.addNode}
    />);
  }

  render() {
    const { currentStep } = this.state;
    return (<div style={{ marginTop: '20px'}} className="text-center">
      { currentStep
        ? <div>
          {this.renderCancelAdd()}
          {this.renderForm()}
        </div>
        : <div>{ this.renderAddStep() }</div>
      }
    </div>);
  }
}

export default AddStep;
