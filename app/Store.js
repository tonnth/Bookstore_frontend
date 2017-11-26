import {Platform} from 'react-native';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import devTools from 'remote-redux-devtools';
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