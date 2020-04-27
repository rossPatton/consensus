namespace ts {
  // declare type match = import('react-router').match;

  // accounts are currently of 2 types. users, and organization admins
  // we consolidate that in the accounts table, along with shared rows
  declare type accountBase = ts.formSubmit & Readonly<{
    created_at?: string,
    deletionDeadline?: Dayjs,
    emails?: ts.email[],
    id: number,
    isNew: boolean,
    isVerified: boolean,
    login: string, // unique login value separate from username or email
    groupId?: number,
    passwordResetToken?: string,
    passwordResetExpires?: string,
    privateEmail: boolean,
    updated_at?: string,
    userId?: number,
    verificationToken?: string,
    verificationExpires?: string,
  }>;

  declare type adminSectionParams = ts.match & {
    params: {
      page?: string,
      section: 'account'
        | 'deleteAccount'
        | 'deleteGroup'
        | 'meetings'
        | 'memberships'
        | 'planMeeting'
        | 'profile',
      subsection?: string,
    }
  }

  declare type email = {
    accountId: number,
    email: string,
    isPrimary: string,
  }

  // password is never sent to the client
  declare type account = tAccountBase & Readonly<{
    password: string,
  }>;

  declare type accountQuery = Partial<tAccountBase> & Readonly<{
    avatarEmail?: string,
    email?: string,
    currentPassword: string,
    newPassword?: string,
  }>;

  // subset of user/org needed for login/authentication
  declare type loginQuery = Readonly<{
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

  // ts.session is like ts.user, but with auth data and everything is optional
  // since a user might not be logged in
  declare type session<T = ts.user | ts.group> = Partial<tAccountBase>
    & Readonly<{
      deletionDeadline?: string,
      isAuthenticated: boolean,
      isVerified: boolean,
      profile: T,
      type: 'org' | 'user',
    }>;

  // pending => user wants to join the group, but isn't approved yet
  // member => can RSVP to meetings, partake in decisions
  // facilitator => can create meetings, decisions
  // admin => can do all the above plus manage the group
  // n/a => inputs cant have null values, so we use this sometimes
  // null => often happens if we're trying to tie roles to users, and there's no match
  declare type role = 'pending' | 'member' | 'facilitator' | 'admin' | 'n/a' | null;

  declare type roleMap = Readonly<{
    groupId: number,
    role: ts.role,
  }>;

  declare type roleRel = ts.roleMap & Readonly<{
    id: number,
    userId: number,
  }>;
}
