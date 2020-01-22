

import { api } from '../../../../utils';
import { getRolesBegin, getRolesFailure, getRolesSuccess } from './actions';

const endpoint = '/api/v1/roles';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const getRoles = () => {
  return async function (dispatch: Function) {
    dispatch(getRolesBegin());

    try {
      const result = await api({path});
      return dispatch(getRolesSuccess(result));
    } catch (err) {
      return dispatch(getRolesFailure(err));
    }
  };
};
