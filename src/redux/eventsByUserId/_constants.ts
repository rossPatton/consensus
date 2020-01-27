const route = '/api/v1/eventsByUser';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
