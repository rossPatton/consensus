// accounts are currently of 2 types. users, and organization admins
// we consolidate that in the accounts table, along with shared rows
declare interface tAccount {
  id: number,
  isVerified: boolean,
  login: string, // unique login value separate from username or email
  orgId?: number,
  password: string, // password goes here, but the referenced profile gets sent to client
  userId?: number,
}

// subset of user/org needed for login/authentication
declare type tLogin = {
  // passport is a black box, and near impossible to debug
  // so we decouple email/username from the login credentials
  // we have to still call the form field 'username' here, or else passport doesnt work
  username: string,
  password: string,
};

// tSession is like tUser, but with auth data and everything is optional
// since a user might not be logged in
declare interface tSession {
  id: number,
  isAuthenticated: boolean,
  isVerified: boolean,
  lastActive?: string,
  login: string, // unique login value separate from username or email
  profile: tOrg | tUser,
  type: 'org' | 'user',
}
