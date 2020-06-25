const route = '/api/v1/meetings';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
