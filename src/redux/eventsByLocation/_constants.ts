const route = '/api/v1/eventsByLocation';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
