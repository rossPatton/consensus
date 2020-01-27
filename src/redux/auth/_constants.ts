const loginRoute = '/auth/login';
export const loginPath = __CLIENT__ ? loginRoute : `${__URL__}${loginRoute}`;

const logoutRoute = '/auth/logout';
export const logoutPath = __CLIENT__ ? logoutRoute : `${__URL__}${logoutRoute}`;
