import {
  tFailureAction as tGetFailureAction,
  tInitAction as tGetInitAction,
  tSuccessAction as tGetSuccessAction,
} from './get/_types';

export type tActions = tGetInitAction
  | tGetFailureAction
  | tGetSuccessAction;
