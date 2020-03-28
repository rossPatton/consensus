declare type tEmail = {accountId: number, email: string, isPrimary: string};

// accounts are currently of 2 types. users, and organization admins
// we consolidate that in the accounts table, along with shared rows
declare type tAccountBase = tFormSubmit & Readonly<{
  created_at?: string,
  deletionDeadline?: Dayjs,
  emails?: tEmail[],
  id: number,
  isNew: boolean,
  isVerified: boolean,
  login: string, // unique login value separate from username or email
  orgId?: number,
  passwordResetToken?: string,
  passwordResetExpires?: string,
  privateEmail: boolean,
  updated_at?: string,
  userId?: number,
  verificationToken?: string,
  verificationExpires?: string,
}>;

// password is never sent to the client
declare type tAccount = tAccountBase & Readonly<{
  password: string,
}>;

declare type tAccountQuery = Partial<tAccountBase> & Readonly<{
  email?: string,
  currentPassword: string,
  newPassword?: string,
}>;

// subset of user/org needed for login/authentication
declare type tLoginQuery = Readonly<{
  // passportjs is a black box, and near impossible to debug
  // so we decouple email/username from the login credentials
  // but we call the login 'username' here, or else passport doesnt work
  username: string,
  password: string,
}>;

// when logging out we return this value
declare type isAuthenticated = Readonly<{
  isAuthenticated: boolean,
}>;

// tSession is like tUser, but with auth data and everything is optional
// since a user might not be logged in
declare type tSession<T = tUser | tGroup> = tAccountBase & Readonly<{
  deletionDeadline?: string,
  isAuthenticated: boolean,
  isVerified: boolean,
  profile: T,
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
