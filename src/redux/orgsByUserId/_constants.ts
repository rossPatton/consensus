const route = '/api/v1/orgsByUserId';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
