import { combineReducers } from 'redux';
import ContentReducer from './ContentReducer';
import { ModalReducer, ModalConfirmReducer } from './ModalReducer';
import UserListReducer from './UserListReducer';
import ValidateReducer from './ValidateReducer';
import UserDetailReducer from './UserDetailReducer';

const rootReducer = combineReducers({
    contentLoaded: ContentReducer,
    modalMessage: ModalReducer,
    onConfirm: ModalConfirmReducer,
    userList: UserListReducer,
    validationSuccess: ValidateReducer,
    loginList: UserDetailReducer
});

export default rootReducer;
