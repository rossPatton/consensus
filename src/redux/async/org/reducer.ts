import {
  GET_ORG_BEGIN,
  GET_ORG_FAILURE,
  GET_ORG_SUCCESS,
  PATCH_ORG_BEGIN,
  PATCH_ORG_FAILURE,
  PATCH_ORG_SUCCESS,
  POST_ORG_BEGIN,
  POST_ORG_FAILURE,
  POST_ORG_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tOrg> = {
  error: null,
  isLoading: false,
  data: {
    category: '',
    city: '',
    cityId: 0,
    country: '',
    countryId: 0,
    description: '',
    email: '',
    eventPrivacy: 'manual',
    gate: 'manual',
    id: 0,
    name: '',
    region: '',
    regionId: 0,
    slug: '',
  },
};

export const orgReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_ORG_BEGIN || PATCH_ORG_BEGIN || POST_ORG_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_ORG_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };

  case GET_ORG_FAILURE || PATCH_ORG_FAILURE || POST_ORG_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  // separate case to force state update
  /* eslint-disable */
  case PATCH_ORG_SUCCESS: {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  }
  /* eslint-enable */

  // separate case to force state update
  /* eslint-disable */
  case POST_ORG_SUCCESS: {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  }
  /* eslint-enable */

  default:
    return state;
  }
};
