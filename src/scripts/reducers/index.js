import { combineReducers } from 'redux';
import ContentReducer from './ContentReducer';

const rootReducer = combineReducers({
    contentLoaded: ContentReducer
});

export default rootReducer;
