import {
  GET_ORG_BEGIN,
  GET_ORG_SUCCESS,
  GET_ORG_FAILURE,
} from './actions';

import { tActionUnion } from './_types';

const initialState: tThunk<tOrg> = {
  error: null,
  isLoading: false,
  data: {
    category: '',
    city: '',
    country: '',
    description: '',
    id: 0,
    email: '',
    orgName: '',
    slug: '',
    state: '',
    username: '',
  },
};

export const getOrgReducer = (state = initialState, action: tActionUnion) => {
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
