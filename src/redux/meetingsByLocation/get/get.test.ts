import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {testMeeting2} from '~app/constants/jest';

import {GET_FAILURE, GET_INIT, GET_SUCCESS} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/meetingsByLocation/get', () => {
  it('creates correct GET_INIT action', () => {
    const expectedActionPayload = [{
      type: GET_INIT,
    }];

    const store = mockStore({});
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct GET_SUCCESS action', () => {
    const expectedActionPayload = [{
      type: GET_SUCCESS,
      payload: [testMeeting2],
    }];

    const store = mockStore({});
    store.dispatch(success([testMeeting2]));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct GET_FAILURE action', () => {
    const expectedActionPayload = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: GET_FAILURE,
    }];

    const store = mockStore({});
    store.dispatch(failure({
      message: 'Oh no! An Error occurred',
      status: 500,
    }));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });
});

