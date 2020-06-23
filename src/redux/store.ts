import {applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Persistor, persistReducer, persistStore} from 'redux-persist';
import expireReducer from 'redux-persist-expire';
import createCompressor from 'redux-persist-transform-compress';
import storage from 'redux-persist/lib/storage';

import {middleware} from './_middleware';
import {rootReducer} from './rootReducer';

const composeEnhancers = composeWithDevTools({
  trace: __DEV__,
  traceLimit: 25,
});

const compressor = createCompressor();
const persistConfig = {
  key: 'redux',
  storage,
  transforms: [compressor, expireReducer('preference', {
    // (Optional) Key to be used for the time relative to which store is to be expired
    persistedAtKey: '__persisted_at',
    // (Required) Seconds after which store will be expired
    expireSeconds: 86400,
    // (Optional) State to be used for resetting e.g. provide initial reducer state
    expiredState: {},
    // and want the store to  be automatically expired if the record is not updated in the `expireSeconds` time
    autoExpire: true,
  })],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

type tStoreReturn = {
  store: Store<any>,
  persistor: Persistor,
};
export const initStore = (initialState?: object): tStoreReturn => {
  let store: Store<any>;

  if (initialState) {
    store = createStore(
      // 1st param === all reducers (using combinedReducer)
      // @ts-ignore
      persistedReducer,
      // 2nd param === any initial preloaded state
      // @ts-ignore
      initialState,
      // 3rd param === middleware/dev tools extension
      composeEnhancers(
        applyMiddleware(...middleware),
      ),
    );
  } else {
    store = createStore(
      // 1st param === all reducers (using combinedReducer)
      persistedReducer,
      // 2nd param === middleware/dev tools extension
      composeEnhancers(
        applyMiddleware(...middleware),
      ),
    );
  }

  const persistor = persistStore(store);
  return { store, persistor };
};
