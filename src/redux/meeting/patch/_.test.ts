import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {testMeeting2} from '~app/constants/jest';

import {PATCH_FAILURE, PATCH_INIT, PATCH_SUCCESS} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

describe('redux/meeting/patch', () => {
  it('creates correct PATCH_INIT action', () => {
    const expectedActionPayload = [{
      type: PATCH_INIT,
    }];

    const store = mockStore({});

    // @ts-ignore @TODO mock common data types for jest
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct PATCH_SUCCESS action', () => {
    const updatedMeeting = {
      ...testMeeting2,
      title: 'Test title',
    };

    const expectedActionPayload = [{
      type: PATCH_SUCCESS,
      payload: updatedMeeting,
    }];

    const store = mockStore({meeting: testMeeting2});
    store.dispatch(success(updatedMeeting));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct PATCH_FAILURE action', () => {
    const expectedActionPayload = [{
      payload: {
        message: 'Oh no! An Error occurred',
        status: 500,
      },
      type: PATCH_FAILURE,
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

