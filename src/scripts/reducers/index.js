import { combineReducers } from 'redux';
import ContentReducer from './ContentReducer';
import ModalReducer from './ModalReducer';

const rootReducer = combineReducers({
    contentLoaded: ContentReducer,
    modalMessage: ModalReducer
});

export default rootReducer;
