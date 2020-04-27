import {
  tFailureAction as tGetFailureAction,
  tSuccessAction as tGetSuccessAction,
} from './get/_types';
import {
  tFailureAction as tPatchFailureAction,
  tSuccessAction as tPatchSuccessAction,
} from './patch/_types';
import {
  tFailureAction as tPostFailureAction,
  tSuccessAction as tPostSuccessAction,
} from './post/_types';

export type tActions = tGetFailureAction
  | tGetSuccessAction
  | tPatchFailureAction
  | tPatchSuccessAction
  | tPostFailureAction
  | tPostSuccessAction;
