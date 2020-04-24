const route = '/api/v1/meetingsByUserId';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
