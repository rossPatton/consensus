const route = '/api/v1/sendEmail';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
