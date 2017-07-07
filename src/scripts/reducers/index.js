import { combineReducers } from 'redux';
import ContentReducer from './ContentReducer';
import ModalReducer from './ModalReducer';
import UserListReducer from './UserListReducer';
import ValidateReducer from './ValidateReducer';

const rootReducer = combineReducers({
    contentLoaded: ContentReducer,
    modalMessage: ModalReducer,
    userList: UserListReducer,
    validationSuccess: ValidateReducer
});

export default rootReducer;
