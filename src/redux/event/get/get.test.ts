import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {GET_FAILURE, GET_INIT, GET_SUCCESS} from './_types';
import {failure, init, success} from './actions';

const mockStore = configureStore([thunk]);

const testMeeting = {
  id:12,
  category: "Political" as tCategory,
  orgId:1,
  cityId:16624,
  orgName:"Tech Workers Coalition NYC",
  isPrivate:false,
  description:"Asperiores et perspiciatis fugit sint. Nihil dolore autem enim numquam dolores aliquam sed repudiandae. Eius dolorem nostrum quo aut culpa incidunt. Aut eum adipisci. Amet amet suscipit et. Voluptas animi distinctio adipisci. Nam voluptas similique quam esse magni quidem id. In aut nulla inventore facilis dicta ducimus molestias saepe. Autem voluptatibus mollitia quos ullam quidem ex consequuntur quia. Adipisci quod est incidunt quas repellendus rem voluptatem. Cumque iusto corporis velit nam nostrum commodi vel possimus velit. Quibusdam ea cumque dignissimos cumque magni voluptas ipsa natus sunt. Est qui officiis atque dolorem voluptatibus aut explicabo.",
  location:"717 Borer Oval",
  locationLink:"http://sam.info",
  locationType:"online",
  title:"aut occaecati iusto nostrum ut",
  slug:"aut-occaecati-iusto-nostrum-ut",
  date:"2020-05-02T10:47:34.393Z",
  endDate:"2021-02-12T02:01:06.513Z",
  isDraft:false,
  duration:2,
  pathToFeaturedImage:"http://lorempixel.com/640/480",
  publicRSVPS: 0,
  privateRSVPS: 1,
  time:"19:00",
}

describe('redux/event/get', () => {
  it('creates correct GET_INIT action', () => {
    const expectedActionPayload = [{
      type: GET_INIT,
    }];

    const store = mockStore({});

    // @ts-ignore @TODO mock common data types for jest
    store.dispatch(init());
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });

  it('creates correct GET_SUCCESS action', () => {
    const expectedActionPayload = [{
      type: GET_SUCCESS,
      payload: testMeeting,
    }];

    const store = mockStore({});
    store.dispatch(success(testMeeting));
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

    // @ts-ignore @TODO mock common data types for jest
    store.dispatch(failure({
      message: 'Oh no! An Error occurred',
      status: 500,
    }));
    expect(store.getActions()).toStrictEqual(expectedActionPayload);
  });
});

