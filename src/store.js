// Store is an object to hold the state of our application.

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxThunk))
);

export default store;