import {
  CREATE_EVENT_BEGIN,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  tBeginAction,
  tSuccessAction,
  tFailureAction,
} from './_types';


export const createEventBegin = (): tBeginAction => ({
  type: CREATE_EVENT_BEGIN,
});

export const createEventSuccess = (payload: tThunk<tPublicEvent>): tSuccessAction => ({
  type: CREATE_EVENT_SUCCESS,
  payload,
});

export const createEventFailure = (payload: Error): tFailureAction => ({
  type: CREATE_EVENT_FAILURE,
  payload,
});