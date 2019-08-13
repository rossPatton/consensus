import { memoize } from 'redux-memoize';
import { Dispatch } from 'redux';
import { agent, objToQueryString } from '../../../utils';

import {
  fileUploadBegin,
  fileUploadSuccess,
  fileUploadFailure,
} from './actions';

export const fileUpload = memoize({ ttl: 300 }, (event: tPublicEvent) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(fileUploadBegin());

    try {
      const prefix = __DEV__ ?
        'https://127.0.0.1:3001/api/v1/fileUpload' :
        '/api/v1/fileUpload';

      const qs = objToQueryString(event);

      // @ts-ignore
      const result = await fetch(`${prefix}?${qs}`, {
        // @ts-ignore
        agent,
        method: 'POST',
      });
      const json = await result.json();
      return dispatch(fileUploadSuccess(json));
    } catch (err) {
      return dispatch(fileUploadFailure(err));
    }
  };
});
