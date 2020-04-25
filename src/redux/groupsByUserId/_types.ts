import {
  tFailureAction as tDeleteFailureAction,
  tInitAction as tDeleteInitAction,
  tSuccessAction as tDeleteSuccessAction,
} from './delete/_types';
import {
  tFailureAction as tGetFailureAction,
  tInitAction as tGetInitAction,
  tSuccessAction as tGetSuccessAction,
} from './get/_types';

export type tActions = tDeleteInitAction
  | tDeleteFailureAction
  | tDeleteSuccessAction
  | tGetInitAction
  | tGetFailureAction
  | tGetSuccessAction;
