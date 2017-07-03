import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from '../../../common/input/InputText';
import InputPassword from '../../../common/input/InputPassword';

class LoginComponent extends Component {

    constructor (props) {
        super(props);
        this.state = props;
    }

    render () { // eslint-disable-line class-methods-use-this
        return (
        <div className="login-component">
          <p>Login Please</p>
          <InputText
            placeholder="Example user name: admin"
					/>
          <InputPassword
            placeholder="Example password: 123"
					/>
        </div>
        );
    }
}
LoginComponent.propTypes = {
    someParam: PropTypes.object
};

export default LoginComponent;
