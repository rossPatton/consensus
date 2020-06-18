import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import {middleware} from './_middleware';
import {rootReducer} from './rootReducer';

const composeEnhancers = composeWithDevTools({
  trace: __DEV__,
  traceLimit: 25,
});

// set up initial store
export const initStore = (initialState?: object) => {
  if (initialState) {
    return createStore(
      // 1st param === all reducers (using combinedReducer)
      // @ts-ignore
      rootReducer,
      // 2nd param === any initial preloaded state
      initialState,
      // 3rd param === middleware/dev tools extension
      composeEnhancers(
        applyMiddleware(...middleware),
      ),
    );
  }

  return createStore(
    // 1st param === all reducers (using combinedReducer)
    rootReducer,
    // 2nd param === middleware/dev tools extension
    composeEnhancers(
      applyMiddleware(...middleware),
    ),
  );
};
