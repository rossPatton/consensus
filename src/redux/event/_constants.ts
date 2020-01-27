const route = '/api/v1/event';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
