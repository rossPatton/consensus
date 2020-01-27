declare type tUserSignupForm = {
  email: string,
  login: string,
  password: string,
  username: string,
};

declare type tUser = {
  bio: string,
  email: string,
  id: number,
  name: string,
  privateEmail: boolean,
  privateMemberships: boolean,
  privateName: boolean,
  privateProfile: boolean,
  privateRSVP: boolean,
  role?: tRole,
  username: string,
};

// getting/posting/deleting users by org membership
declare type tGetUserQuery = Partial<tUser> & tBaseQuery;
