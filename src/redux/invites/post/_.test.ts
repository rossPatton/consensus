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

describe('redux/invites/post', () => {
  it('creates correct POST_INIT action', () => {
    const expectedActionPayload: tInitAction[] = [{
      type: POST_INIT,
    }];

    const store = mockStore({});
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct POST_SUCCESS action', () => {
    const testUser = {
      id: 1,
      bio: '',
      username: 'testUser',
    } as ts.user;

    const testUserInvite = {
      id: 1,
      userId: 1,
      groupId: 1,
      type: 'mod' as 'member' | 'facilitator',
      user: testUser,
    };

    const expectedActionPayload: tSuccessAction[] = [{
      type: POST_SUCCESS,
      payload: testUserInvite,
    }];

    const store = mockStore({});
    store.dispatch(success(testUserInvite));
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

