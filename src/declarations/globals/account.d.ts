// accounts are currently of 2 types. users, and organization admins
// we consolidate that in the accounts table, along with shared rows
declare type tAccountBase = tFormSubmit & Readonly<{
  id: number,
  isVerified: boolean,
  login: string, // unique login value separate from username or email
  orgId?: number,
  userId?: number,
}>;

declare type tAccount = tAccountBase & Readonly<{
  password: string,
}>;

declare type tAccountQuery = Partial<tAccountBase> & Readonly<{
  password: string,
  newPassword?: string,
}>;

// subset of user/org needed for login/authentication
declare type tLoginQuery = Readonly<{
  // passportjs is a black box, and near impossible to debug
  // so we decouple email/username from the login credentials
  // we still call the login 'username' here, or else passport doesnt work
  username: string,
  password: string,
}>;

// when logging out we return this value
declare type isAuthenticated = Readonly<{
  isAuthenticated: boolean,
}>;

// tSession is like tUser, but with auth data and everything is optional
// since a user might not be logged in
declare type tSession = isAuthenticated & Readonly<{
  id: number,
  isVerified: boolean, // has user been confirmed by email
  login: string, // unique login value separate from username or email
  profile: tOrg | tUser,
  type: 'org' | 'user',
}>;

// pending => user wants to join the group, but isn't approved yet
// member => can RSVP to events, partake in decisions
// facilitator => can create events, decisions
// admin => can do all the above plus manage the group
// n/a => inputs cant have null values, so we use this sometimes
// null => often happens if we're trying to tie roles to users, and there's no match
declare type tRole = 'pending' | 'member' | 'facilitator' | 'admin' | 'n/a' | null;

declare type tRoleMap = Readonly<{
  orgId: number,
  role: tRole,
}>;

declare type tAccountRoleRelation = tRoleMap & Readonly<{
  id: number,
  userId: number,
}>;
