// actions
export {
  failure as postRoleFailure,
  success as postRoleSuccess,
} from './post/actions';

// thunks
export { getRoles } from './get/thunk';
export { postRole } from './post/thunk';
