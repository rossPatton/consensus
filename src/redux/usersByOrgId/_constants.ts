const route = '/api/v1/usersByOrgId';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
