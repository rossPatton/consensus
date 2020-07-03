import * as types from './_types';
import {checkedReducer as reducer} from './reducer';

describe('redux/checked/reducer', () => {
  it('should return empty object if bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual({});
  });

  it('should handle CHECK_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@checked/CHECK_FAILURE',
      payload: {
        message: 'something went wrong',
        status: 500,
      },
    })).toStrictEqual({
      message: 'something went wrong',
      status: 500,
    });
  });

  it('should handle CHECK_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@checked/CHECK_SUCCESS',
      payload: {1: true, 2: true},
    })).toStrictEqual({
      1: true,
      2: true,
    });
  });
});
