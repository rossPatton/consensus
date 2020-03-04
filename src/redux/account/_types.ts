import {
  tFailureAction as tDeleteFailure,
  tSuccessAction as tDeleteSuccess,
} from './delete/_types';
import {
  tFailureAction as tPatchFailure,
  tSuccessAction as tPatchSuccess,
} from './patch/_types';

export type tAccountActionUnion = tDeleteFailure
  | tDeleteSuccess
  | tPatchFailure
  | tPatchSuccess;
