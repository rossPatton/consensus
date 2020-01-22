

import { api } from '../../../utils';
import {
  fileUploadBegin,
  fileUploadFailure,
  fileUploadSuccess,
} from './actions';

const endpoint = '/api/v1/fileUpload';
const path = __CLIENT__ ? endpoint : `${__URL__}${endpoint}`;

export const fileUpload = (query: tEvent) => {
  return async function (dispatch: Function) {
    dispatch(fileUploadBegin());

    try {
      const result = await api({method: 'POST', query, path});
      return dispatch(fileUploadSuccess(result));
    } catch (err) {
      return dispatch(fileUploadFailure(err));
    }
  };
};
