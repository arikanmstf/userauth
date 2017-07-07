import { connect } from 'react-redux';
import RegisterComponent from './RegisterComponent';
import { submitRegisterForm } from './RegisterActions';

const mapDispatchToProps = (dispatch) => {
    return {
        submitRegisterForm: (form) => {
            dispatch(submitRegisterForm(form));
        }
    };
};

export default connect(null, mapDispatchToProps)(RegisterComponent);
