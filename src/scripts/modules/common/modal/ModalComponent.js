import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            message: props.message
        };
    }
    onConfirm () {
        this.props.onConfirm();
        this.props.closeModal();
    }
    render () {
        return (this.props.message !== '') ?
        (<div className="modal-component">
          <div className="modal-popup">
            <p className="modal-message">{this.props.message}</p>
              {this.props.onConfirm ?
                <div><button className="btn btn-danger" onClick={this.props.closeModal}>CANCEL</button>
                <button className="btn btn-success right" onClick={() => this.onConfirm()}>CONFIRM</button></div> :
                <button className="btn" onClick={this.props.closeModal}>OK</button>
              }
          </div>
        </div>) : null;
    }
}
ModalComponent.propTypes = {
    message: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    onConfirm: PropTypes.func
};

export default ModalComponent;
