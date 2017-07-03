import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputText from '../../../common/input/InputText';

class LoginComponent extends Component {

    constructor (props) {
        super(props);
        this.state = props;
    }

    render () { // eslint-disable-line class-methods-use-this
        return (
        <div>
          <p>Login Please</p>
          <InputText />
        </div>
        );
    }
}
LoginComponent.propTypes = {
    someParam: PropTypes.object
};

export default LoginComponent;
