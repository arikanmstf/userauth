import { connect } from 'react-redux';
import ValidateComponent from './ValidateComponent';
import { submitValidation } from './ValidateActions';

const mapDispatchToProps = (dispatch) => {
    return {
        submitValidation: (form) => {
            dispatch(submitValidation(form));
        }
    };
};
const mapStateToProps = (state) => {
    return {
        validationSuccess: state.validationSuccess
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateComponent);
