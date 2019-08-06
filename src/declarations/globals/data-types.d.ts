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

declare type tEvent = {
  id: number,

  category: string,
  city: string,
  country: string,
  date: string,
  description: string,
  going: boolean,
  interested: boolean,
  location: string,
  notGoing: boolean,
  orgId: number,
  slug: string,
  state: string,
  title: string,

  session: {
    attended: boolean,
    isGoing: boolean,
    isInterested: boolean,
    isNotGoing: boolean,
  }
};

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
  email?: string,
  fname?: string,
  lname?: string,
  password?: string, // we dont want to include the pw client side
  username?: string,
};

declare type tUsersByOrg = {
  userTotal: number,
  users: tUser[],
};

declare type tRoute = {
  component: any, // @TODO fix any
  exact?: boolean,
  path: string,
  private?: boolean,
  redirect?: string,
};
