import loglevel from 'loglevel';
import { Action, Dispatch, Middleware } from 'redux';

// S === State, A === Action
// this crashReporter is for the redux pipeline, not anything else
export const crashReporter: Middleware = <S>() =>
  (next: Dispatch<S>) =>
  <A extends Action>(action: A): A => {
    try {
      return next(action);
    } catch (err) {
      loglevel.error('Redux Exception: ', err);
      throw err;
    }
  };
