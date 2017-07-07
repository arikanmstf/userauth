import { combineReducers } from 'redux';
import ContentReducer from './ContentReducer';
import ModalReducer from './ModalReducer';
import UserListReducer from './UserListReducer';
import ValidateReducer from './ValidateReducer';
import UserDetailReducer from './UserDetailReducer';

const rootReducer = combineReducers({
    contentLoaded: ContentReducer,
    modalMessage: ModalReducer,
    userList: UserListReducer,
    validationSuccess: ValidateReducer,
    loginList: UserDetailReducer
});

export default rootReducer;
