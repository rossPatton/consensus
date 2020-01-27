const route = '/api/v1/region';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
