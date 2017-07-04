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
const mapStateToProps = (state) => {
    return {
        someParam: state.someParam
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
