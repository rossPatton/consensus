const route = '/api/v1/orgs';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
