const route = '/api/v1/eventsByUserId';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
