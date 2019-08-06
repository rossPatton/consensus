import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { rootReducer } from './rootReducer';
import { middleware } from './middleware';

// set up initial store
export const initStore = (initialState?: object) => {
  if (initialState) {
    return createStore(
      // 1st param === all reducers (using combinedReducer)
      rootReducer,
      // 2nd param === any initial preloaded state
      initialState,
      // 3rd param === middleware/dev tools extension
      composeWithDevTools(
        applyMiddleware(...middleware),
      )
    );
  }

  return createStore(
    // 1st param === all reducers (using combinedReducer)
    rootReducer,
    // 2nd param === middleware/dev tools extension
    composeWithDevTools(
      applyMiddleware(...middleware),
    )
  );
};
