import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputText from '../../../common/input/InputText';

class UserForgotComponent extends Component {
    constructor (props) {
        super(props);
        this.state = props;
        this.submitForgotForm = this.submitForgotForm.bind(this);
    }
    submitForgotForm () {
        const form = {
            email: this.state.email
        };
        this.props.submitForgotForm(form);
    }

    render () {
        return (
        <div className="user-forgot-component">
          <p>Enter your email address to recover your password</p>
          <InputText
            onChange={e => this.setState({ email: e })}
            placeholder="Example email: admin@example.com"
          />
          <button className="btn btn-primary" onClick={() => this.submitForgotForm()}>Submit</button>
        </div>
        );
    }
}
UserForgotComponent.propTypes = {
    submitForgotForm: PropTypes.func.isRequired
};

export default UserForgotComponent;
