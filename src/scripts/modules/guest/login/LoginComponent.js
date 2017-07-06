import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputText from '../../../common/input/InputText';
import InputPassword from '../../../common/input/InputPassword';

class LoginComponent extends Component {

    constructor (props) {
        super(props);
        this.state = props;
        this.submitLoginForm = this.submitLoginForm.bind(this);
    }
    submitLoginForm () {
        const form = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.submitLoginForm(form);
    }

    render () {
        return (
        <div className="login-component">
          <p>Login Please</p>
          <InputText
            onChange={e => this.setState({ email: e })}
            placeholder="Example email: admin@example.com"
          />
          <InputPassword
            onChange={e => this.setState({ password: e })}
            placeholder="Example password: 123"
          />
          <button className="btn btn-primary btn-login" onClick={() => this.submitLoginForm()}>Submit</button>
          <ul className="login-page-options">
            <li><Link to="/guest/register">Register</Link></li>
            <li><Link to="/guest/forgot">Forgot Password</Link></li>
          </ul>
        </div>
        );
    }
}
LoginComponent.propTypes = {
    submitLoginForm: PropTypes.func.isRequired,
    someParam: PropTypes.object
};

export default LoginComponent;
