

import { api } from '../../../utils';
import {
  getUserByIdBegin,
  getUserByIdFailure,
  getUserByIdSuccess,
} from './actions';

const endpoint = '/api/v1/user';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getUserById = (query: tIdQueryC) => {
  return async function (dispatch: Function) {
    dispatch(getUserByIdBegin());

    try {
      const result = await api({path, query});
      return dispatch(getUserByIdSuccess(result));
    } catch (err) {
      return dispatch(getUserByIdFailure(err));
    }
  };
};
