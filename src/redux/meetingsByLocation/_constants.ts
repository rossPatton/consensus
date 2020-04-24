const route = '/api/v1/meetingsByLocation';
export const path = __CLIENT__ ? route : `${__URL__}${route}`;
