declare type tUserSignupForm = {
  readonly email: string,
  readonly login: string,
  readonly password: string,
  readonly username: string,
};

declare type tUser = {
  readonly created_at?: Date,
  readonly bio: string,
  readonly city?: string,
  readonly email: string,
  readonly id: number,
  readonly name: string,
  readonly phone: string,
  readonly privateEmail: boolean,
  readonly privateLocation: boolean,
  readonly privateMemberships: boolean,
  readonly privateName: boolean,
  readonly privatePhone: boolean,
  readonly privateProfile: boolean,
  readonly privateRSVP: boolean,
  readonly role?: tRole,
  readonly updated_at?: Date,
  readonly username: string,
};

// getting/posting/deleting users by org membership
declare type tGetUserQuery = Partial<tUser> & tBaseQuery;
declare type tPatchUserQuery = tGetUserQuery;
