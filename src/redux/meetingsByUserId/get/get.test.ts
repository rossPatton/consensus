import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  GET_FAILURE,
  GET_INIT,
  GET_SUCCESS,
  tFailureAction,
  tInitAction,
  tSuccessAction,
} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

const testMeeting = {
  id: 12,
  category: 'Political' as ts.category,
  groupId: 1,
  host: '',
  cityId: 16624,
  groupName: 'Tech Workers Coalition NYC',
  isOnline: false,
  isPrivate: false,
  description: '',
  location: '717 Borer Oval',
  locationLink: 'http://sam.info',
  locationType: 'online',
  title: 'aut occaecati iusto nostrum ut',
  slug: 'aut-occaecati-iusto-nostrum-ut',
  date: '2020-05-02T10:47:34.393Z',
  endDate: '2021-02-12T02:01:06.513Z',
  isDraft: false,
  duration: 2,
  img: '',
  publicRSVPS: 0,
  privateRSVPS: 1,
  time: '19:00',
};

describe('redux/meetingsByUserId/get', () => {
  it('creates correct GET_INIT action', () => {
    const expectedActionPayload: tInitAction[] = [{
      type: GET_INIT,
    }];

    const store = mockStore({});
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct GET_SUCCESS action', () => {
    const expectedActionPayload: tSuccessAction[] = [{
      type: GET_SUCCESS,
      payload: [testMeeting],
    }];

    const store = mockStore({});
    store.dispatch(success([testMeeting]));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct GET_FAILURE action', () => {
    const expectedActionPayload: tFailureAction[] = [{
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

