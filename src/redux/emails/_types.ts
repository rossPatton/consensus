import {
  tFailureAction as tPostFailureAction,
  tInitAction as tPostInitAction,
  tSuccessAction as tPostSuccessAction,
} from './post/_types';

export type tActions = tPostInitAction
  | tPostFailureAction
  | tPostSuccessAction;
