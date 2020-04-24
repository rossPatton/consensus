const route = '/api/v1/usersByGroupId';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
