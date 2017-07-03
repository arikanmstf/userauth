import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputText extends Component {
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
          type="text"
          className="form-control input input-text"
          placeholder={this.state.placeholder}
          onChange={this.handleChange}
        />
        );
    }
}

InputText.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

InputText.defaultProps = {
    placeholder: '',
    onChange: InputText.defaultOnChange
};

export default InputText;
