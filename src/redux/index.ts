// exports actions/thunks here for easier importing
// import loadable from '@loadable/component';

// export const setRole = loadable(() =>
//   import(/* webpackChunkName: "Admin" */'../pages/Admin')
// );

// actions here
export { setRole } from './async/roles/actions';
export { setUserByOrg } from './async/usersByOrg/actions';

// thunks here
export { patchAccount } from './async/account/thunk';
export { authenticateSession, logOutOfSession } from './async/session/thunk';
export { createEvent } from './async/createEvent/thunk';
export { fileUpload } from './async/fileUpload/thunk';
export { getCity } from './async/city/thunk';
export { getDecision, postDecision } from './async/decision/thunk';
export { getCountry } from './async/country/thunk';
export { getDecisionsByOrg } from './async/getDecisionsByOrg/thunk';
export { getEventById } from './async/getEventById/thunk';
export { deleteEvent, getEvents, getEventsByUser } from './async/events/thunk';
export { getOrg, patchOrg, postOrg } from './async/org/thunk';
export { deleteOrgByUser, getOrgsBySession, getOrgsByUser } from './async/orgs/thunk';
export { getRegion } from './async/region/thunk';
export { getRoles } from './async/roles/thunk';
export { getRsvps, setRsvp } from './async/rsvps/thunk';
export { getOrgsBySearch } from './async/search/thunk';
export { getUserById } from './async/user/thunk';
export { getUsers } from './async/users/thunk';
export { deleteUserByOrg, getUsersByOrg, patchUserByOrg, postNewUserByOrg } from './async/usersByOrg/thunk';
export { registerUser } from './async/registerUser/thunk';
export { getVotes, submitVote } from './async/userDecisions/thunk';
export { updateUser } from './async/updateUser/thunk';
