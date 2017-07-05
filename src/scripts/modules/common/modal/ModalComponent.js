import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalComponent extends Component {
    constructor (props) {
        super(props);
        this.state = {
            message: props.message
        };
    }
    render () {
        return (this.props.message !== '') ?
        (<div className="modal-component">
          <div className="modal-popup">
            <p className="modal-message">{this.props.message}</p>
            <button className="btn" onClick={this.props.closeModal}>OK</button>
          </div>
        </div>) : null;
    }
}
ModalComponent.propTypes = {
    message: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default ModalComponent;
