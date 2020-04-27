import {
  tFailureAction as tDeleteFailure,
  tSuccessAction as tDeleteSuccess,
} from './delete/_types';
import {
  tFailureAction as tPatchFailure,
  tSuccessAction as tPatchSuccess,
} from './patch/_types';

export type tActions = tDeleteFailure
  | tDeleteSuccess
  | tPatchFailure
  | tPatchSuccess;
