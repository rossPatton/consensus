// accounts are currently of 2 types. users, and organization admins
// we consolidate that in the accounts table, along with shared rows
declare type tAccountBase = {
  readonly id: number,
  readonly isVerified: boolean,
  readonly login: string, // unique login value separate from username or email
  readonly orgId?: number,
  readonly userId?: number,
}

declare type tAccount = tAccountBase & {
  readonly password: string,
}

declare type tAccountQuery = Partial<tAccountBase> & {
  password: string,
  newPassword?: string,
};

// subset of user/org needed for login/authentication
declare type tLoginQuery = {
  // passport is a black box, and near impossible to debug
  // so we decouple email/username from the login credentials
  // we still call the login 'username' here, or else passport doesnt work
  readonly username: string,
  readonly password: string,
};

// when logging out we return this value
declare type isAuthenticated = {
  readonly isAuthenticated: boolean,
};

// tSession is like tUser, but with auth data and everything is optional
// since a user might not be logged in
declare type tSession = isAuthenticated & {
  readonly id: number,
  readonly isVerified: boolean,
  readonly login: string, // unique login value separate from username or email
  readonly profile: tOrg | tUser,
  readonly type: 'org' | 'user',
}

// pending => user wants to join the group, but isn't approved yet
// member => can RSVP to events, partake in decisions
// facilitator => can create events, decisions
// admin => can do all the above plus manage the group
// n/a => inputs cant have null values, so we use this sometimes
// null => often happens if we're trying to tie roles to users, and there's no match
declare type tRole = 'pending' | 'member' | 'facilitator' | 'admin' | 'n/a' | null;

declare type tRoleMap = {
  orgId: number,
  role: tRole,
};

declare type tAccountRoleRelation = tRoleMap & {
  id: number,
  userId: number,
};
