import {
  tBeginAction as tLoginBeginAction,
  tFailureAction as tLoginFailureAction,
  tSuccessAction as tLoginSuccessAction,
} from './login/_types';
import {
  tBeginAction as tLogoutBeginAction,
  tFailureAction as tLogoutFailureAction,
  tSuccessAction as tLogoutSuccessAction,
} from './logout/_types';

export type tActionUnion = tLoginBeginAction
  | tLoginFailureAction
  | tLoginSuccessAction
  | tLogoutBeginAction
  | tLogoutFailureAction
  | tLogoutSuccessAction;
