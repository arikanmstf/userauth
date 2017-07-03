import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // eslint-disable-line no-unused-vars
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import App from './app.jsx';  // eslint-disable-line no-unused-vars
import reducers from './reducers/index';

const document = window.document; // eslint-disable-line no-undef
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const component = (<Provider store={createStoreWithMiddleware(reducers)}><App /></Provider>);

ReactDOM.render(component, document.querySelector('.main-content'));
