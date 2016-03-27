require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from 'store/configureStore';
import App from 'containers/app';

const serverState = window.__INITIAL_STATE__ || {};

const initialState = {
  user: {
    loggedIn: null,
    loading: false,
  },
};

const store = configureStore({ ...initialState, ...serverState });

ReactDOM.render(
  React.createElement(App, { store }),
  document.querySelector('.app-container')
);
