import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {DELETE_FAILURE, DELETE_INIT, DELETE_SUCCESS} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

const testMeeting = {
  id: 12,
  category: 'Political' as ts.category,
  groupId: 1,
  host: '',
  cityId: 16624,
  groupName: 'Tech Workers Coalition NYC',
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
      payload: testMeeting,
    }];

    const store = mockStore({});
    store.dispatch(success(testMeeting));
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

