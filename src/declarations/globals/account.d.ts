namespace ts {
  declare type baseAccount = Readonly<{
    avatar: string,
    created_at?: Date,
    city?: string, // city.name
    cityId?: number, // city.id
    country: string,
    countryId: number,
    email: string,
    facebook?: string,
    id: number,
    region?: string,
    regionId?: number,
    sessionType: 'group' | 'user',
    showOnboarding?: boolean,
    otpSecret?: string,
    updated_at?: Date,
    token?: string,
    twitter?: string,
    website?: string,
  }>;

  declare type sessionType = 'group' | 'user';

  declare type adminSectionParams = ts.match & {
    params: {
      page?: string,
      section: 'deleteAccount'
        | 'deleteGroup'
        | 'invite'
        | 'mail'
        | 'meetings'
        | 'memberships'
        | 'planMeeting'
        | 'profile'
        | 'rsvps'
        | 'security',
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

  declare type qr = {
    qrcode: string;
    secret: string;
  };

  declare type session<T = ts.user | ts.group> = ts.isAuthenticated
    & Readonly<{
      profile: T extends ts.user ? ts.user : ts.group,
      qr: qr,
      type: ts.sessionType, // T extends ts.user ? 'user' : 'group'
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
