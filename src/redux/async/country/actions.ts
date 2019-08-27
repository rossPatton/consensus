import {
  GET_COUNTRY_BEGIN,
  GET_COUNTRY_FAILURE,
  GET_COUNTRY_SUCCESS,
  tBeginAction,
  tFailureAction,
  tSuccessAction,
} from './_types';

export const getCountryBegin = (): tBeginAction => ({
  type: GET_COUNTRY_BEGIN,
});

export const getCountrySuccess = (payload: tEvent[]): tSuccessAction => ({
  type: GET_COUNTRY_SUCCESS,
  payload,
});

export const getCountryFailure = (payload: Error): tFailureAction => ({
  type: GET_COUNTRY_FAILURE,
  payload,
});
