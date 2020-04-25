import * as types from './_types';
import {initialState, rsvpsReducer as reducer} from './reducer';

describe('redux/rsvps/reducer', () => {
  it('should return initial state, even with a bunk action', () => {
    expect(reducer(undefined, {} as types.tActions))
      .toStrictEqual(initialState);
  });

  it('should handle GET_INIT', () => {
    expect(reducer(undefined, {
      type: '@@rsvps/GET_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle GET_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@rsvps/GET_FAILURE',
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

  it('should handle GET_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@rsvps/GET_SUCCESS',
      payload: [{
        meetingId: 1,
        type: 'public',
        userId: 1,
        value: 'yes',
      }],
    })).toStrictEqual({
      ...initialState,
      fetched: true,
      data: [{
        meetingId: 1,
        type: 'public',
        userId: 1,
        value: 'yes',
      }],
    });
  });

  it('should handle PATCH_INIT', () => {
    expect(reducer(undefined, {
      type: '@@rsvps/PATCH_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle PATCH_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@rsvps/PATCH_FAILURE',
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

  it('should handle PATCH_SUCCESS', () => {
    const initialState = {
      error: null,
      fetched: false,
      isLoading: false,
      data: [{
        id: 1,
        meetingId: 1,
        type: 'private',
        userId: 1,
        value: 'maybe',
      }, {
        id: 2,
        meetingId: 1,
        type: 'private',
        userId: 2,
        value: 'no',
      }],
    } as tThunk<tRSVP[]>;

    expect(reducer(initialState, {
      type: '@@rsvps/PATCH_SUCCESS',
      payload: {
        id: 1,
        meetingId: 1,
        type: 'private',
        userId: 1,
        value: 'yes',
      },
    })).toStrictEqual({
      ...initialState,
      data: [{
        id: 1,
        meetingId: 1,
        type: 'private',
        userId: 1,
        value: 'yes',
      }, {
        id: 2,
        meetingId: 1,
        type: 'private',
        userId: 2,
        value: 'no',
      }],
    });
  });

  it('should handle POST_INIT', () => {
    expect(reducer(undefined, {
      type: '@@rsvps/POST_INIT',
    })).toStrictEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle POST_FAILURE', () => {
    expect(reducer(undefined, {
      type: '@@rsvps/POST_FAILURE',
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

  it('should handle POST_SUCCESS', () => {
    expect(reducer(undefined, {
      type: '@@rsvps/POST_SUCCESS',
      payload: {
        meetingId: 2,
        type: 'private',
        userId: 1,
        value: 'no',
      },
    })).toStrictEqual({
      ...initialState,
      data: [{
        meetingId: 2,
        type: 'private',
        userId: 1,
        value: 'no',
      }],
    });
  });
});
