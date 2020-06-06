const sendRoute = '/api/v1/sendToken';
const validateRoute = '/api/v1/validateToken';
export const sendPath = __CLIENT__ ? sendRoute : `${__URL__}${sendRoute}`;
export const validatePath = __CLIENT__ ? validateRoute : `${__URL__}${validateRoute}`;
