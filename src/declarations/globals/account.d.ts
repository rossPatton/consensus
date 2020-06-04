namespace ts {
  declare type baseAccount = Readonly<{
    avatar: string,
    created_at?: Date,
    city?: string, // city.name
    cityId?: number, // city.id
    // lives in accounts table,
    // but we merge into user when rendering user pages
    email: string,
    facebook: string,
    id: number,
    region?: string,
    regionId?: number,
    sessionType: 'group' | 'user',
    showOnboarding?: boolean,
    updated_at?: Date,
    twitter: string,
    website: string,
  }>;

  declare type adminSectionParams = ts.match & {
    params: {
      page?: string,
      section: 'account'
        | 'deleteAccount'
        | 'deleteGroup'
        | 'invite'
        | 'meetings'
        | 'memberships'
        | 'planMeeting'
        | 'profile'
        | 'rsvps',
      subsection?: string,
    }
  }

  // subset of user/org needed for login/authentication
  declare type loginQuery = Readonly<{
    email: string,
    sessionType: string,
    token: string,
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
      profile: T,
      type: 'group' | 'user',
    }>;

  declare type groupSession = Partial<tAccountBase>
    & Readonly<{
      deletionDeadline?: string,
      isAuthenticated: boolean,
      isVerified: boolean,
      profile: ts.group,
      type: 'group',
    }>;

  declare type userSession = Partial<tAccountBase>
    & Readonly<{
      isAuthenticated: boolean,
      isVerified: boolean,
      profile: ts.user,
      type: 'user',
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
