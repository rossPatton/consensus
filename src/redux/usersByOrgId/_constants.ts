const route = '/api/v1/usersByOrg';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
