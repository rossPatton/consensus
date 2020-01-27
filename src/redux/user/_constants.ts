const route = '/api/v1/user';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
