import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './store/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store';

const rootElement = document.getElementById('root');

// If server-rendered markup exists, use hydrate
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>,
    rootElement
  );
} else {
  // Otherwise, use render
  ReactDOM.render(
    <Provider store={store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>,
    rootElement
  );
}
