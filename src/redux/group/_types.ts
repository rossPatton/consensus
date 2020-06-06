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
import {
  tFailureAction as tPatchFailureAction,
  tInitAction as tPatchInitAction,
  tSuccessAction as tPatchSuccessAction,
} from './patch/_types';
import {
  tFailureAction as tPostFailureAction,
  tInitAction as tPostInitAction,
  tSuccessAction as tPostSuccessAction,
} from './post/_types';

export type tActions = tDeleteInitAction
  | tDeleteFailureAction
  | tDeleteSuccessAction
  | tGetInitAction
  | tGetFailureAction
  | tGetSuccessAction
  | tPatchFailureAction
  | tPatchInitAction
  | tPatchSuccessAction
  | tPostFailureAction
  | tPostInitAction
  | tPostSuccessAction;
