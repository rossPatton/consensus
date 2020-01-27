import {
  tFailureAction as tGetFailureAction,
  tSuccessAction as tGetSuccessAction,
} from './get/_types';
import {
  tFailureAction as tPostFailureAction,
  tSuccessAction as tPostSuccessAction,
} from './post/_types';

export type tRolesActionUnion = tGetFailureAction
  | tGetSuccessAction
  | tPostFailureAction
  | tPostSuccessAction;
