const route = '/api/v1/orgsByUser';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
