import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from '../../../common/input/InputText';
import InputPassword from '../../../common/input/InputPassword';

class RegisterComponent extends Component {

    constructor (props) {
        super(props);
        this.state = props;
        this.submitRegisterForm = this.submitRegisterForm.bind(this);
    }
    submitRegisterForm () {
        const form = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_again: this.state.password_again
        };
        this.props.submitRegisterForm(form);
    }

    render () {
        return (
        <div className="register-component">
          <p>To register, enter your email, password and username</p>
          <InputText
            onChange={e => this.setState({ username: e })}
            placeholder="Enter your username"
          />
          <InputText
            onChange={e => this.setState({ email: e })}
            placeholder="Enter your email"
          />
          <InputPassword
            onChange={e => this.setState({ password: e })}
            placeholder="Enter your password"
          />
          <InputPassword
            onChange={e => this.setState({ password_again: e })}
            placeholder="Enter your password again"
          />
          <button className="btn btn-primary btn-login" onClick={() => this.submitRegisterForm()}>Submit</button>
        </div>
        );
    }
}
RegisterComponent.propTypes = {
    submitRegisterForm: PropTypes.func.isRequired
};

export default RegisterComponent;
