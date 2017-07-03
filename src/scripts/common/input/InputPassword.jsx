import { Component } from 'react';
import PropTypes from 'prop-types';

class InputPassword extends Component {
    constructor (props) {
        super(props);
        this.state = {
            placeholder: props.placeholder
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    }

    defaultOnChange () {
        return this;
    }

    render () {
        return (
        <input
          type="password"
          className="form-control input input-password"
          placeholder={this.state.placeholder}
          onChange={this.handleChange}
        />
        );
    }
}
InputPassword.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

InputPassword.defaultProps = {
    placeholder: '',
    onChange: InputPassword.defaultOnChange
};

export default InputPassword;
