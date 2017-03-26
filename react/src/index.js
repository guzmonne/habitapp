import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root.js';
import configureStore from './store/configureStore.js'
import './_styles/index.css';

ReactDOM.render(
  <Root store={configureStore()}/>,
  document.getElementById('root')
);
