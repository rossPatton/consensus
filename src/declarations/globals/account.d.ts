// accounts are currently of 2 types. users, and organization admins
// we consolidate that in the accounts table, along with shared rows
declare type tAccount = {
  readonly id: number,
  readonly isVerified: boolean,
  readonly login: string, // unique login value separate from username or email
  readonly orgId?: number,
  readonly password: string,
  readonly userId?: number,
}

// subset of user/org needed for login/authentication
declare type tLogin = {
  // passport is a black box, and near impossible to debug
  // so we decouple email/username from the login credentials
  // we have to still call the form field 'username' here, or else passport doesnt work
  readonly username: string,
  readonly password: string,
};

// when logging out we return this value
declare type tLogoutReturn = {
  readonly isAuthenticated: boolean,
};

// tSession is like tUser, but with auth data and everything is optional
// since a user might not be logged in
declare type tSession = tLogoutReturn & {
  readonly id: number,
  readonly isVerified: boolean,
  readonly lastActive?: string,
  readonly login: string, // unique login value separate from username or email
  readonly profile: tOrg | tUser,
  readonly type: 'org' | 'user',
}
