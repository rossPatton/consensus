const route = '/api/v1/account';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
