import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from './store/index';
import { Provider } from 'react-redux';

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root'),
);
