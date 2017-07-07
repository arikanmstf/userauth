import { connect } from 'react-redux';
import LoginComponent from './LoginComponent';
import { submitLoginForm } from './LoginActions';

const mapDispatchToProps = (dispatch) => {
    return {
        submitLoginForm: (form) => {
            dispatch(submitLoginForm(form));
        }
    };
};

export default connect(null, mapDispatchToProps)(LoginComponent);
