import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import * as reducers from 'reducers';

const rootReducer = combineReducers(reducers);

// const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

export default function configureStore(initial) {
  const store = createStore(rootReducer, initial, compose(
    applyMiddleware(thunk, logger())
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(combineReducers(nextReducer));
    });
  }

  return store;
}
