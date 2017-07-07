import { connect } from 'react-redux';
import UserDetailComponent from './UserDetailComponent';
import { getAllLogins } from './UserDetailActions';

const mapDispatchToProps = (dispatch) => {
    return {
        getAllLogins: (form) => {
            dispatch(getAllLogins(form));
        }
    };
};
const mapStateToProps = (state) => {
    return {
        loginList: state.loginList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailComponent);
