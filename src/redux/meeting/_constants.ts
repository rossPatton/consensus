const route = '/api/v1/meeting';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
