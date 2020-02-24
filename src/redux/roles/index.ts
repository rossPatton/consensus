export {
  failure as deleteRoleFailure,
  success as deleteRoleSuccess,
} from './delete/actions';
export {
  failure as postRoleFailure,
  success as postRoleSuccess,
} from './post/actions';

export { getRoles } from './get/thunk';
export { postRole } from './post/thunk';
