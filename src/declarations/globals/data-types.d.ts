declare interface tThunk<D> {
  error?: Error | null,
  data: D,
  isLoading: boolean,
};

declare interface tAction<T, P = undefined> {
  type: T,
  payload?: P,
};

declare type tApprovalResults = {
  results: {count: number, label: string}[],
  winners: number,
};

declare type tSimpleMajorityResults = {
  results: {
    abstain: number,
    no: number,
    yes: number,
  },
};

declare type tDecisionType = 'n/a' | 'Simple Poll' | 'Simple Majority' | 'Approval';

declare type tDecision = {
  options: { // db needs objects, not arrays
    list: string[],
  },
  date: string,
  data: any, // voting results
  description: string,
  endDate: string,
  id: number,
  isClosed: boolean,
  orgId: number,
  orgName: string,
  title: string,
  type: tDecisionType,
};

// TODO need to rethink how to split up event types
// creating an event, event schema in db, not logged in event
declare type tEvent = {
  attendees: number,
  category: string,
  city: string,
  country: string,
  date: string,
  description: string,
  endDate: string,
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
  id: number,
  membershipTotal: number,
  name: string,
  slug: string,
  region: string,
  regionId: number,
  updatedAt?: string, // we dont send to client
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
  bio: string,
  email: string,
  id: number,
  name: string,
  privateEmail: boolean,
  privateMemberships: boolean,
  privateName: boolean,
  privateProfile: boolean,
  privateRSVP: boolean,
  role?: tRole,
  username: string,
};

declare type tRSVP = {
  eventId: number,
  id?: number,
  // only one can be true at a time
  privateRSVP: boolean,
  publicRSVP: boolean,
  userId: number,
};

// member => can RSVP to events, partake in decisions
// facilitator => can create events, decisions
// admin => can do all the above plus manage the group
// n/a => inputs cant have null values, so we use this sometimes
// null => often happens if we're trying to tie roles to users, and there's no match
declare type tRole = 'member' | 'facilitator' | 'admin' | 'n/a' | null;
declare type tRoleMap = {
  orgId: number,
  role: tRole,
}

declare type tAccountRoleRelation = tRoleMap & {
  id: number,
  userId: number,
}

declare type tUserOrgRelation = {
  id: number,
  userId: number,
  orgId: number,
};

// accounts are currently of 2 types. users, and organization admins
// we consolidate that in the accounts table, along with shared rows
declare type tAccount = {
  id: number,
  isVerified: boolean,
  login: string, // unique login value separate from username or email
  orgId?: number,
  password: string, // password goes here, but the referenced profile gets sent to client
  userId?: number,
};

// subset of user/org needed for login/authentication
declare type tLogin = {
  // passport is a fucking black box, and near impossible to debug
  // so we decouple email/username from the login credentials
  // we have to still call the form field 'username' here, or else passport doesnt work
  username: string,
  password: string,
};

declare type tCrumb = {
  display: string,
  to: string,
};

declare type tPrivacyFilter = 'n/a' | 'public' | 'private';
declare type tPublishedFilter = 'n/a' | 'published' | 'draft';

// tSession is like tUser, but with auth data and everything is optional
// since a user might not be logged in
declare type tSession = {
  id: number,
  isAuthenticated: boolean,
  isVerified: boolean,
  lastActive?: string,
  login: string, // unique login value separate from username or email
  profile: tOrg | tUser,
  type: 'org' | 'user',
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
