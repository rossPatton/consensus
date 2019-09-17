declare interface tThunk<D> {
  error?: Error | null,
  data: D,
  isLoading: boolean,
};

declare interface tAction<T, P = undefined> {
  type: T,
  payload?: P,
};

declare type tApprovalData = {
  choices: {count: number, label: string}[],
  winners: number,
};

declare type tSimpleMajorityData = {
  abstain: number,
  no: number,
  yes: number,
}

declare type tDecision = {
  data: any,
  date: string,
  description: string,
  id: number,
  minutes: string,
  orgId: number,
  rationale: string,
  title: string,
  type: 'Simple Majority' | 'Approval',
};

// TODO need to rethink how to split up event types
// creating an event, event schema in db, not logged in event
declare type tEvent = {
  category: string,
  city: string,
  country: string,
  date: string,
  description: string,
  endDate: string,
  goingCount: number,
  id: number,
  isDraft: boolean,
  isPrivate: boolean,
  location: string,
  locationLink: string,
  name: string,
  orgId: number,
  orgName: string,
  rsvp: boolean,
  slug: string,
  state: string,
  title: string,
};

declare type tRSVP = {
  eventId: number,
  id?: number,
  userId: number,
  rsvp: boolean,
};

declare type tGate = 'public' | 'manual' | 'private';

declare type tOrg = {
  category: string,
  city: string,
  cityId: number,
  country: string,
  countryId: number,
  createdAt?: string, // we dont send to client
  description: string,
  email?: string, // user admin account only
  eventPrivacy: tGate,
  gate: tGate,
  id?: number,
  membershipTotal: number,
  name: string,
  password?: string, // never sent to client
  role?: tRole,
  slug: string,
  region: string,
  regionId: number,
  updatedAt?: string, // we dont send to client
  // username: string,
};

declare type tDirectoryParams = {
  city?: string,
  country?: string,
  page?: string,
  region?: string,
};

declare type tOrgRouteParams = tDirectoryParams & {
  id?: string,
  slug: string,
  page?: string,
  section?: string,
};

declare type tUser = {
  id: number,
  email: string,
  fname: string,
  lname: string,
  password: string,
  username: string,
  role: tRole,
};

declare type tUserEventRelation = {
  id: number,
  eventId: number,
  rsvp: boolean,
  userId: number,
};

// member => can RSVP to events, partake in decisions
// facilitator => can create events, decisions
// admin => can do all the above plus manage the group
declare type tRole = 'member' | 'facilitator' | 'admin' | 'n/a';
declare type tRoleMap = {
  orgId: number,
  role: tRole,
}

declare type tUserOrgRelation = tRoleMap & {
  id: number,
  userId: number,
}

// subset of user/org needed for login/authentication
declare type tLogin = {
  login: string,
  password: string,
};

declare type tAuth = {
  isAuthenticated: boolean,
};

declare type tCrumb = {
  display: string,
  to: string,
};

// tSession is like tUser, but with auth data and everything is optional
// since a user might not be logged in
declare type tSession = {
  id?: number | string,
  isAuthenticated?: boolean,
  createdAt?: string,
  email?: string,
  fname?: string,
  hasAvatar?: boolean,
  lastActive?: string,
  lname?: string,
   // we dont want to include the pw client side, generally
  password?: string,
  // simple map of org ids and role types to determine level of access for user
  roles?: tRoleMap[],
  rsvps?: {
    eventId: number,
    rsvp: boolean,
  }[],
  updatedAt?: string,
  username?: string,
};

declare type tUsersByOrg = {
  userTotal: number,
  users: tUser[],
};

declare type tRoute = {
  component: React.ReactComponentElement, //React.ReactNode,
  exact?: boolean,
  path: string,
  private?: boolean,
  redirect?: string,
};

// typical id-based db query
declare type tIdQuery = {
  // exclude an id, or something else
  exclude?: number,
  // id to search by
  id: number,
  // filter out private events/decisions/etc if user is not logged in
  isPublic?: boolean,
  limit?: number,
  offset?: number,
};

// once the above values are passed to the server, they become strings
declare type tIdQueryServer = {
  query: {
    exclude?: string,
    id: string,
    isPublic?: boolean,
    limit?: string,
    offset?: string,
  }
};

declare type tLocationQueryServer = {
  query: tDirectoryParams,
};

declare type tCountry = {
  code: string, // us
  id: number,
  name: string, // United States
  regions?: tRegion[],
  regionType: 'state'|'province'|'prefecture';
};

declare type tRegion = tCountry & {
  cities?: tCity[],
  country: number, // country.id
};

declare type tCity = tRegion & {
  orgs: tOrg[],
  region, // region.id
};

declare interface tFetchResponse<T = any> extends Response {
  json<P = T>(): Promise<P>
};
