const loginRoute = '/auth/v1/login';
export const loginPath = __CLIENT__ ? loginRoute : `${__URL__}${loginRoute}`;

const logoutRoute = '/auth/v1/logout';
export const logoutPath = __CLIENT__ ? logoutRoute : `${__URL__}${logoutRoute}`;
