const route = '/api/v1/groups';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
