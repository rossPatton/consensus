import {
  tFailureAction as tDeleteFailureAction,
  tSuccessAction as tDeleteSuccessAction,
} from './delete/_types';
import {
  tFailureAction as tGetFailureAction,
  tSuccessAction as tGetSuccessAction,
} from './get/_types';

export type tGroupsByUserIdActionUnion = tDeleteFailureAction
  | tDeleteSuccessAction
  | tGetFailureAction
  | tGetSuccessAction;
