import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from '../../../common/input/InputText';
import InputPassword from '../../../common/input/InputPassword';

class LoginComponent extends Component {

    constructor (props) {
        super(props);
        this.state = props;
    }
    submitLoginForm () {
        const form = {
            username: 'admin',
            password: '123'
        };
        this.props.submitLoginForm(form);
    }

    render () {
        return (
        <div className="login-component">
          <p>Login Please</p>
          <InputText
            placeholder="Example user name: admin"
          />
          <InputPassword
            placeholder="Example password: 123"
          />
          <button onClick={() => this.submitLoginForm()}>Submit</button>
        </div>
        );
    }
}
LoginComponent.propTypes = {
    submitLoginForm: PropTypes.func.isRequired,
    someParam: PropTypes.object
};

export default LoginComponent;
