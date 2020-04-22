import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {PATCH_FAILURE, PATCH_INIT, PATCH_SUCCESS} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

const testMeeting = {
  id:12,
  category: "Political" as tCategory,
  orgId:1,
  cityId:16624,
  orgName:"Tech Workers Coalition NYC",
  isPrivate:false,
  description: "",
  location:"717 Borer Oval",
  locationLink:"http://sam.info",
  locationType:"online",
  title:"aut occaecati iusto nostrum ut",
  slug:"aut-occaecati-iusto-nostrum-ut",
  date:"2020-05-02T10:47:34.393Z",
  endDate:"2021-02-12T02:01:06.513Z",
  isDraft: false,
  duration:2,
  publicRSVPS: 0,
  privateRSVPS: 1,
  time:"19:00",
};

describe('redux/event/patch', () => {
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
      ...testMeeting,
      title: "Test title",
    };

    const expectedActionPayload = [{
      type: PATCH_SUCCESS,
      payload: updatedMeeting,
    }];

    const store = mockStore({event: testMeeting});
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

