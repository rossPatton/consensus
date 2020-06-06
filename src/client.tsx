// this is the main entrypoint for the app
require('es6-promise').polyfill();
import 'core-js/stable';
import 'isomorphic-fetch';
import 'regenerator-runtime/runtime';

import FontFaceObserver from 'fontfaceobserver';
import loglevel from 'loglevel';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ScrollToTop } from './components';
import { AppShell } from './containers';
import { initStore } from './redux/store';

const font = new FontFaceObserver('Founders', {weight: 400});
font.load()
  .then(() => {
    document.documentElement.className += ' wf-loaded';
    return null;
  })
  .catch(loglevel.error);

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
// loadableReady(() => {
if (rootNode.hasChildNodes()) {
  ReactDOM.hydrate(App, rootNode);
} else {
  ReactDOM.render(App, rootNode);
}
// });
