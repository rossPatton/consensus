const route = '/api/v1/rsvp';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
