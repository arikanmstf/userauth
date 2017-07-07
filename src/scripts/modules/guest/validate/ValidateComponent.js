import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ValidateComponent extends Component {

    constructor (props) {
        super(props);
        this.state = props;
    }
    componentDidMount () {
        const form = {
            validation_token: this.state.match.params.validationToken
        };
        this.props.submitValidation(form);
    }

    render () {
        return (
        <div className="validate-component">
          { this.props.validationSuccess ?
            <span className="alert alert-success">{'Your email address has been verified.'}</span> :
            <span className="alert alert-danger">{'Error while valdidating your email address.'}</span>
          }
        </div>
        );
    }
}
ValidateComponent.propTypes = {
    submitValidation: PropTypes.func.isRequired,
    validationSuccess: PropTypes.bool.isRequired
};

export default ValidateComponent;
