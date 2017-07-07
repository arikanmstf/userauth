import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <ul className="login-page-options">
            <li><Link to="/guest/login">Login</Link></li>
            <li><Link to="/guest/forgot">Forgot Password</Link></li>
          </ul>
        </div>
        );
    }
}
RegisterComponent.propTypes = {
    submitRegisterForm: PropTypes.func.isRequired
};

export default RegisterComponent;
