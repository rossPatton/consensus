import loglevel from 'loglevel';
import { Action, Dispatch, Middleware } from 'redux';

// S === State, A === Action, client side redux auto-logger
export const logger: Middleware = <S>() =>
  (next: Dispatch<S>) =>
  <A extends Action>(action: A): A => {
    if (__DEBUG__) loglevel.debug('Redux Dispatching: ', action);
    return next(action);
  };
