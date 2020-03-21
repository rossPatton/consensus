const route = '/api/v1/cities';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
