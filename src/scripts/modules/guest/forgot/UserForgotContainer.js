import { connect } from 'react-redux';
import UserForgotComponent from './UserForgotComponent';
import { submitForgotForm } from './UserForgotActions';

const mapDispatchToProps = (dispatch) => {
    return {
        submitForgotForm: (form) => {
            dispatch(submitForgotForm(form));
        }
    };
};

export default connect(null, mapDispatchToProps)(UserForgotComponent);
