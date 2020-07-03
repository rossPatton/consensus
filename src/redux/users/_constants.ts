const route = '/api/v1/users';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
