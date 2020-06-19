// main entry point for app
import 'isomorphic-fetch';
import '~app/css/styles.css';

import loglevel from 'loglevel';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { ScrollToTop } from '~app/components';
import { AppShell } from '~app/containers';
import { initStore } from '~app/redux/store';
import { isPrivateMode } from '~app/utils';

const cookies = new Cookies();

if (!cookies.get('cssPreloaded')) {
  cookies.set('cssPreloaded', true, {sameSite: 'strict', secure: true});
}

if (!cookies.get('fontsPreloaded')) {
  cookies.set('fontsPreloaded', true, {sameSite: 'strict', secure: true});
}

if (!cookies.get('workboxPreloaded')) {
  cookies.set('workboxPreloaded', true, {sameSite: 'strict', secure: true});
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

(async () => {
  const browserIsPrivate = await isPrivateMode();
  // check is necessary for cases where the user has modified their browser
  // security settings to disallow persistent cookies/storage
  if (browserIsPrivate) return;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (err) {
        loglevel.error(err);
      }
    });
  }
})();
