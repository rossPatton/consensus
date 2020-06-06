import {
  tFailureAction as tSendFailureAction,
  tInitAction as tSendInitAction,
  tSuccessAction as tSendSuccessAction,
} from './send/_types';
import {
  tFailureAction as tValidateFailureAction,
  tInitAction as tValidateInitAction,
  tSuccessAction as tValidateSuccessAction,
} from './validate/_types';

export type tActions = tSendFailureAction
  | tSendInitAction
  | tSendSuccessAction
  | tValidateFailureAction
  | tValidateInitAction
  | tValidateSuccessAction;
