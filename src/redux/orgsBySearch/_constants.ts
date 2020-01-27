const route = '/api/v1/search';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
