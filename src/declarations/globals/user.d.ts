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

declare type tUsersByOrg = {
  userTotal: number,
  users: tUser[],
};
