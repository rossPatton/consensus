import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {POST_FAILURE, POST_INIT, POST_SUCCESS} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

const testMeeting = {
  attendees: 2,
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
  publicRSVPS: [{}] as ts.user[],
  time: '19:00',
};

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
      ...testMeeting,
      title: 'Test title',
    };

    const expectedActionPayload = [{
      type: POST_SUCCESS,
      payload: updatedMeeting,
    }];

    const store = mockStore({meeting: testMeeting});
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

