import {
  tFailureAction as tGetFailureAction,
  tInitAction as tGetInitAction,
  tSuccessAction as tGetSuccessAction,
} from './get/_types';
import {
  tFailureAction as tPostFailureAction,
  tSuccessAction as tPostSuccessAction,
} from './post/_types';

export type tRolesActionUnion = tGetInitAction
  | tGetFailureAction
  | tGetSuccessAction
  | tPostFailureAction
  | tPostSuccessAction;
