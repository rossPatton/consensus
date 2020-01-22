

import {api} from '../../../utils';
import { postEventBegin, postEventFailure, postEventSuccess } from './actions';

const endpoint = '/api/v1/event';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const postEvent = (query: tPostEventQuery) => {
  return async function (dispatch: Function) {
    dispatch(postEventBegin());

    try {
      const result = await api({method: 'POST', query, path});
      return dispatch(postEventSuccess(result));
    } catch (err) {
      return dispatch(postEventFailure(err));
    }
  };
};
