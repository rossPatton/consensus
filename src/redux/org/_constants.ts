const route = '/api/v1/org';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
