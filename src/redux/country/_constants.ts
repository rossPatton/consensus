const route = '/api/v1/country';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
