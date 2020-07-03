const route = '/api/v1/spaces';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
