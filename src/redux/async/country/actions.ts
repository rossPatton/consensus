import {
  GET_COUNTRY_BEGIN,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
  tBeginAction,
  tSuccessAction,
  tFailureAction,
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
