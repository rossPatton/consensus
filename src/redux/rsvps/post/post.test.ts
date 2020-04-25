import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  POST_FAILURE,
  POST_INIT,
  POST_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/rsvps/post', () => {
  it('creates correct POST_INIT action', () => {
    const expectedActionPayload: tInitAction[] = [{
      type: POST_INIT,
    }];

    const store = mockStore({});
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct POST_SUCCESS action', () => {
    const testRSVP = {
      meetingId: 1,
      id: 1,
      type: 'private',
      userId: 1,
      value: 'yes',
    } as tRSVP;

    const expectedActionPayload: tSuccessAction[] = [{
      type: POST_SUCCESS,
      payload: testRSVP,
    }];

    const store = mockStore({});
    store.dispatch(success(testRSVP));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct POST_FAILURE action', () => {
    const expectedActionPayload: tFailureAction[] = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: POST_FAILURE,
    }];

    const store = mockStore({});

    // @ts-ignore @TODO mock common data types for jest
    store.dispatch(failure({
      message: 'Oh no! An Error occurred',
      status: 500,
    }));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });
});

