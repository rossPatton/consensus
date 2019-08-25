import {
  GET_CITY_BEGIN,
  GET_CITY_SUCCESS,
  GET_CITY_FAILURE,
  tBeginAction,
  tSuccessAction,
  tFailureAction,
} from './_types';

export const getCityBegin = (): tBeginAction => ({
  type: GET_CITY_BEGIN,
});

export const getCitySuccess = (payload: tEvent[]): tSuccessAction => ({
  type: GET_CITY_SUCCESS,
  payload,
});

export const getCityFailure = (payload: Error): tFailureAction => ({
  type: GET_CITY_FAILURE,
  payload,
});
