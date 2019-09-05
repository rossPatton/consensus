import {
  GET_ORG_BEGIN,
  GET_ORG_FAILURE,
  GET_ORG_SUCCESS,
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
    gate: 'private',
    id: 0,
    membershipTotal: 0,
    name: '',
    region: '',
    regionId: 0,
    role: null,
    slug: '',
    username: '',
  },
};

export const orgReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case GET_ORG_BEGIN:
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

  case GET_ORG_FAILURE:
    return {
      ...state,
      data: initialState.data,
      error: action.payload,
      isLoading: false,
    };

  default:
    return state;
  }
};
