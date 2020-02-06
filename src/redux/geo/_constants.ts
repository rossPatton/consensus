const route = '/api/v1/geo';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
