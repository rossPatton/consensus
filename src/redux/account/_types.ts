import {
  tFailureAction as tDeleteFailure,
  tInitAction as tDeleteInit,
  tSuccessAction as tDeleteSuccess,
} from './delete/_types';
import {
  tFailureAction as tPatchFailure,
  tInitAction as tPatchInit,
  tSuccessAction as tPatchSuccess,
} from './patch/_types';
import {
  tFailureAction as tPostFailure,
  tInitAction as tPostInit,
  tSuccessAction as tPostSuccess,
} from './post/_types';

export type tActions = tDeleteInit
  | tDeleteFailure
  | tDeleteSuccess
  | tPatchInit
  | tPatchFailure
  | tPatchSuccess
  | tPostInit
  | tPostFailure
  | tPostSuccess;
