import {
  DELETE_ORG_BY_USER_BEGIN,
  DELETE_ORG_BY_USER_FAILURE,
  DELETE_ORG_BY_USER_SUCCESS,
  GET_ORGS_BY_SESSION_BEGIN,
  GET_ORGS_BY_SESSION_FAILURE,
  GET_ORGS_BY_SESSION_SUCCESS,
  GET_ORGS_BY_USER_BEGIN,
  GET_ORGS_BY_USER_FAILURE,
  GET_ORGS_BY_USER_SUCCESS,
  tActionUnion,
} from './_types';

const initialState: tThunk<tOrg[]> = {
  error: null,
  isLoading: false,
  data: [],
};

export const orgsReducer = (state = initialState, action: tActionUnion) => {
  switch (action.type) {
  case DELETE_ORG_BY_USER_BEGIN
    || GET_ORGS_BY_USER_BEGIN
    || GET_ORGS_BY_SESSION_BEGIN:
    return {
      ...state,
      isLoading: true,
    };

  case GET_ORGS_BY_USER_SUCCESS || GET_ORGS_BY_SESSION_SUCCESS: {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
    };
  }

  case DELETE_ORG_BY_USER_FAILURE
    || GET_ORGS_BY_USER_FAILURE
    || GET_ORGS_BY_SESSION_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  case DELETE_ORG_BY_USER_SUCCESS: {
    const removedOrg = action.payload as any;
    const orgId = parseInt(removedOrg.orgId, 10);
    const copy = [...state.data];
    const indexOfRemovedUser = copy.findIndex(org => orgId === org.id);
    copy.splice(indexOfRemovedUser, 1);

    return {
      ...state,
      data: copy,
      isLoading: false,
    };
  }

  default:
    return state;
  }
};
