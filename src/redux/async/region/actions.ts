import {
  GET_REGION_BEGIN,
  GET_REGION_SUCCESS,
  GET_REGION_FAILURE,
  tBeginAction,
  tSuccessAction,
  tFailureAction,
} from './_types';

export const getRegionBegin = (): tBeginAction => ({
  type: GET_REGION_BEGIN,
});

export const getRegionSuccess = (payload: tEvent[]): tSuccessAction => ({
  type: GET_REGION_SUCCESS,
  payload,
});

export const getRegionFailure = (payload: Error): tFailureAction => ({
  type: GET_REGION_FAILURE,
  payload,
});
