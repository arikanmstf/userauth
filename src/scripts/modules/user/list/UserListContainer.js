import { connect } from 'react-redux';
import UserListComponent from './UserListComponent';
import { getAllUsers } from './UserListActions';

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: (form) => {
            dispatch(getAllUsers(form));
        }
    };
};
const mapStateToProps = (state) => {
    return {
        userList: state.userList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListComponent);
