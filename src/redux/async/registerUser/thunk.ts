

import { api } from '../../../utils';
import {
  registerUserBegin,
  registerUserFailure,
  registerUserSuccess,
} from './actions';

const endpoint = '/api/v1/user';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const registerUser = (query: tUserSignupForm) => {
  return async function (dispatch: Function) {
    dispatch(registerUserBegin());

    try {
      const result = await api({method: 'POST', query, path});
      return dispatch(registerUserSuccess(result));
    } catch (err) {
      return dispatch(registerUserFailure(err));
    }
  };
};
