import {
  tFailureAction as tDelFailureAction,
  tInitAction as tDelInitAction,
  tSuccessAction as tDelSuccessAction,
} from './delete/_types';
import {
  tFailureAction as tGetFailureAction,
  tInitAction as tGetInitAction,
  tSuccessAction as tGetSuccessAction,
} from './get/_types';

export type tActions = tDelInitAction
  | tDelFailureAction
  | tDelSuccessAction
  | tGetInitAction
  | tGetFailureAction
  | tGetSuccessAction;
