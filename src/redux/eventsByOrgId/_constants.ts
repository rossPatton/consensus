const route = '/api/v1/events';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
