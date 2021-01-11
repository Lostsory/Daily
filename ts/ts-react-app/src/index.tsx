import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import AppLayout from './Layout';

import store from './store';

import '@atlaskit/css-reset';
import './assets/css/index.css';

ReactDOM.render(
  <Provider store={store}>
    <AppLayout/>
  </Provider>,
  document.getElementById('root')
);
