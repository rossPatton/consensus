const route = '/api/v1/groupsByUserId';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
