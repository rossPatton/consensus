import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {testMeeting2} from '~app/constants/jest';

import {DELETE_FAILURE, DELETE_INIT, DELETE_SUCCESS} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/meetingsByGroupId/delete', () => {
  it('creates correct DELETE_INIT action', () => {
    const expectedActionPayload = [{
      type: DELETE_INIT,
    }];

    const store = mockStore({});
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct DELETE_SUCCESS action', () => {
    const expectedActionPayload = [{
      type: DELETE_SUCCESS,
      payload: testMeeting2,
    }];

    const store = mockStore({});
    store.dispatch(success(testMeeting2));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct DELETE_FAILURE action', () => {
    const expectedActionPayload = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: DELETE_FAILURE,
    }];

    const store = mockStore({});
    store.dispatch(failure({
      message: 'Oh no! An Error occurred',
      status: 500,
    }));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });
});

