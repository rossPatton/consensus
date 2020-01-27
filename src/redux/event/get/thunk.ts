import {path} from '../_constants';
import { api } from '../../../utils';
import {begin, failure, success} from './actions';

export const getEvent = (query: tGetEventQuery) => {
  return async function (dispatch: Function): Promise<tEvent> {
    dispatch(begin());

    return api({
      dispatch,
      failure,
      query,
      path,
      success,
    });
  };
};
