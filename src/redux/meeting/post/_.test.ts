import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {testMeeting1} from '~app/constants/jest';

import {POST_FAILURE, POST_INIT, POST_SUCCESS} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/meeting/post', () => {
  it('creates correct POST_INIT action', () => {
    const expectedActionPayload = [{
      type: POST_INIT,
    }];

    const store = mockStore({});

    // @ts-ignore @TODO mock common data types for jest
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct POST_SUCCESS action', () => {
    const updatedMeeting = {
      ...testMeeting1,
      title: 'Test title',
    };

    const expectedActionPayload = [{
      type: POST_SUCCESS,
      payload: updatedMeeting,
    }];

    const store = mockStore({meeting: testMeeting1});
    store.dispatch(success(updatedMeeting));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct POST_FAILURE action', () => {
    const expectedActionPayload = [{
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

