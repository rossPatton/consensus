import { SET_ACTIVE_SESSION } from './_types';

export const setActiveSession = (payload: tSession) => ({
  type: SET_ACTIVE_SESSION,
  payload,
});
