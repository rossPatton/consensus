import * as types from './_types';
import {initialState, tokenReducer as reducer} from './reducer';

describe('redux/tokens/reducer', () => {
  it('bunk action returns initial state', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle SEND_INIT', () => {
    expect(reducer(undefined, {
      type: '@@tokens/SEND_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle SEND_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@tokens/SEND_FAILURE',
      payload: {
        message: 'Error!',
        status: 500,
      },
    })).toStrictEqual({
      ...initialState,
      error: {
        message: 'Error!',
        status: 500,
      },
    });
  });

  it('should handle SEND_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@tokens/SEND_SUCCESS',
      payload: [{}] as ts.city[],
    })).toStrictEqual({
      ...initialState,
      data: [{}],
    });
  });
});
