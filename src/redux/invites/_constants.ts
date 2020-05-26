const route = '/api/v1/invites';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
