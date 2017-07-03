import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';

class LoginComponent extends Component {

    constructor (props) {
        super(props);
        this.state = props;
    }

    render () {
        return (
        <div>
          <h1>Login Please</h1>
        </div>
        );
    }
}
LoginComponent.propTypes = {
    someParam: PropTypes.object
};

export default LoginComponent;
