import { Dispatch } from 'redux';
import { memoize } from 'redux-memoize';

import { agent, objToQueryString } from '../../../utils';
import {
  fileUploadBegin,
  fileUploadFailure,
  fileUploadSuccess,
} from './actions';

const prefix = `${__URL__}/api/v1/fileUpload`;

export const fileUpload = memoize({ttl: 300}, (event: tEvent) => {
  return async function <S>(dispatch: Dispatch<S>) {
    dispatch(fileUploadBegin());

    try {
      const qs = objToQueryString(event);
      const result = await fetch(`${prefix}?${qs}`, {
        // @ts-ignore
        agent,
        method: 'POST',
      })
        .then((response: tFetchResponse) => {
          if (!response.ok) throw response;
          return response.json();
        });

      return dispatch(fileUploadSuccess(result));
    } catch (err) {
      return dispatch(fileUploadFailure(err));
    }
  };
});
