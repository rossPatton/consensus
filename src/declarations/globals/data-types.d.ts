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
  id: number, // we dont usually expose the id on the client side
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

declare type tOrgRoute = {
  country: string,
  state: string,
  city: string,
  org: string,
};

declare type tUser = {
  id: number,
  isAuthenticated: boolean,
  email: string,
  fname: string,
  lname: string,
  password?: string, // we dont want to include the pw client side
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

declare type tSession = {
  id?: number,
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
