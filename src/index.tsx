import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import './style/global.sass';
import { Provider } from 'react-redux';
import { store } from './services/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
