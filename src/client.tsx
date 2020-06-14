// this is the main entrypoint for the app
require('es6-promise').polyfill();
import 'core-js/stable';
import 'isomorphic-fetch';
import 'regenerator-runtime/runtime';
import '~app/css/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
// import loglevel from 'loglevel';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { ScrollToTop } from './components';
import { AppShell } from './containers';
import { initStore } from './redux/store';

const cookies = new Cookies();

if (!cookies.get('cssPreloaded')) {
  cookies.set('cssPreloaded', true, {sameSite: true, secure: true});
}

if (!cookies.get('fontsPreloaded')) {
  cookies.set('fontsPreloaded', true, {sameSite: true, secure: true});
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the initial state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = initStore(preloadedState);

const rootNode = document.getElementById('appRoot');
const App = (
  <Provider store={store as any}>
    <BrowserRouter>
      <ScrollToTop>
        <AppShell />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

// mount app on the client
if (rootNode.hasChildNodes()) {
  ReactDOM.hydrate(App, rootNode);
} else {
  ReactDOM.render(App, rootNode);
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js')
//     .then(registration => {
//       if (__DEV__) loglevel.log('SW registered: ', registration);
//     })
//     .catch(registrationError => {
//       if (__DEV__) loglevel.error('SW registration failed: ', registrationError);
//     });
//   });
// }
