import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from 'store/configureStore';
import App from 'containers/app';

const store = configureStore({
  count: 0
});

ReactDOM.render(
  React.createElement(App, { store }),
  document.querySelector('.app-container')
);
