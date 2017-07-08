import { connect } from 'react-redux';
import UserListComponent from './UserListComponent';
import { getAllUsers, removeUser } from './UserListActions';
import { openConfirmModal } from '../../common/modal/ModalActions';

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: (form) => {
            dispatch(getAllUsers(form));
        },
        removeUser: (username) => {
            dispatch(removeUser(username));
        },
        openConfirmModal: (config) => {
            dispatch(openConfirmModal(config));
        }
    };
};
const mapStateToProps = (state) => {
    return {
        userList: state.userList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListComponent);
