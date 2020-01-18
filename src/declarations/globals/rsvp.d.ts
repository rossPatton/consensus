declare interface tRSVP {
  eventId: number,
  id?: number,
  // only one can be true at a time
  privateRSVP: boolean,
  publicRSVP: boolean,
  userId: number,
}

declare interface tRSVPQuery {
  id: number,
  type: 'public' | 'private',
  value: boolean,
}
