import { CHECK_FAILURE, CHECK_SUCCESS, tActions } from './_types';

export const checkedReducer = (state = {}, action: tActions) => {
  switch (action.type) {
  case CHECK_FAILURE:
    return action.payload;

  case CHECK_SUCCESS:
    return action.payload;

  default: {
    return state;
  }
  }
};
