
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {reducer} from './reducers/Reducer';


const middleware = applyMiddleware(thunk, promise, logger);

const store = createStore(
    reducer,
    middleware
);

export default store;