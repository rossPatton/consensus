import {
  GET_FAILURE,
  GET_INIT,
  GET_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';

export const init = (): tInitAction => ({type: GET_INIT});

export const failure = (payload: Error): tFailureAction => ({
  type: GET_FAILURE,
  payload,
});

export const success = (payload: tRoleMap[]): tSuccessAction => ({
  type: GET_SUCCESS,
  payload,
});
