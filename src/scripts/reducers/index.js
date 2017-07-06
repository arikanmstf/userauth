import { combineReducers } from 'redux';
import ContentReducer from './ContentReducer';
import ModalReducer from './ModalReducer';
import UserListReducer from './UserListReducer';

const rootReducer = combineReducers({
    contentLoaded: ContentReducer,
    modalMessage: ModalReducer,
    userList: UserListReducer
});

export default rootReducer;
