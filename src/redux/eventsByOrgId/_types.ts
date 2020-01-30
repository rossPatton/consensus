import {
  tFailureAction as tDelFailureAction,
  tSuccessAction as tDelSuccessAction,
} from './delete/_types';
import {
  tFailureAction as tGetFailureAction,
  tSuccessAction as tGetSuccessAction,
} from './get/_types';

export type tActionUnion = tDelFailureAction
  | tDelSuccessAction
  | tGetFailureAction
  | tGetSuccessAction;
