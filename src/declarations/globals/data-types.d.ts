// TODO define country/state maps
declare interface tThunk<D> {
  error?: Error | null,
  data: D,
  isLoading: boolean,
}

declare interface tAction<T, P = undefined> {
  type: T,
  payload?: P,
}

declare type tApprovalData = {
  choices: { count: number, label: string }[],
  winners: number,
};

declare type tSimpleMajorityData = {
  abstain: number,
  no: number,
  yes: number,
}

declare type tDecision = {
  id: number,

  data: any,
  date: string,
  description: string,
  minutes: string,
  orgId: number,
  rationale: string,
  title: string,
  type: 'Simple Majority' | 'Approval',
};

// TODO need to rethink how to split up event types
// creating an event, event schema in db, not logged in event
declare type tPublicEvent = {
  id: number,
  category: string,
  city: string,
  country: string,
  date: string,
  description: string,
  endDate: string,
  goingCount: number,
  isPrivate: boolean,
  location: string,
  locationLink: string,
  orgId: number,
  orgName: string,
  slug: string,
  state: string,
  title: string,
};

// if user is logged in, we map in their checkin/rsvp status to each event
declare type tEvent = tPublicEvent & {
  status?: tRSVP,
}

declare type tOrg = {
  id: number,
  category: string,
  city: string,
  country: string,
  description: string,
  email: string,
  orgName: string,
  slug: string,
  state: string,
  username: string,
};

declare type tOrgRouteParams = {
  city: string,
  country: string,
  org: string,
  page?: string,
  section?: string,
  state: string;
};

declare type tUser = {
  id: number,
  email: string,
  fname: string,
  lname: string,
  password: string,
  username: string,
};

declare type tRSVP = {
  didAttend: boolean,
  isGoing: boolean,
};

declare type tUserEventRelation = tRSVP & {
  id: number,
  eventId: number,
  userId: number,
};

declare type tRole = 'member' | 'admin' | null;
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
  password: string,
  username: string,
};

declare type tAuth = {
  isAuthenticated: boolean,
};

// tSession is like tUser, but with auth data and everything is optional
// since a user might not be logged in
declare type tSession = {
  id?: number | string,
  isAuthenticated?: boolean,
  createdAt?: string,
  email?: string,
  fname?: string,
  lastActive?: string,
  lname?: string,
   // we dont want to include the pw client side, generally
  password?: string,
  // simple map of org ids and role types to determine level of access for user
  roles?: tRoleMap[],
  rsvps?: {
    eventId: number,
    status: tRSVP,
  }[],
  updatedAt?: string,
  username?: string,
};

declare type tUsersByOrg = {
  userTotal: number,
  users: tUser[],
};

declare type tRoute = {
  component: React.ReactNode,
  exact?: boolean,
  path: string,
  private?: boolean,
  redirect?: string,
};

// typical id-based db query
type tIdQuery = {
  exclude?: number,

  id: number,
  limit?: number,
  offset?: number,
};

// once the above values are passed to the server, they become strings
type tIdQueryServer = {
  query: {
    exclude?: string,
    id: string,
    limit?: string,
    offset?: string,
  }
};
