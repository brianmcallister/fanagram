require('es6-promise').polyfill();
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from 'store/configureStore';
import App from 'containers/app';

console.log('initial', window.__INITIAL_STATE__);
const serverState = window.__INITIAL_STATE__ || {};

const initialState = {
  loggedIn: null,
  count: 0
};

const store = configureStore({ ...initialState, ...serverState });

ReactDOM.render(
  React.createElement(App, { store }),
  document.querySelector('.app-container')
);
