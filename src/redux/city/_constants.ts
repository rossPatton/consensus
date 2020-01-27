const route = '/api/v1/city';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
