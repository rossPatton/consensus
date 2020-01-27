const route = '/api/v1/rsvps';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
