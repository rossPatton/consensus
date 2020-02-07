declare type tUserSignupForm = Readonly<{
  email: string,
  login: string,
  password: string,
  username: string,
}>;

declare type tUser = Readonly<{
  created_at?: Date,
  bio: string,
  city?: string, // city.name
  cityId?: number, // city.id
  email: string,
  id: number,
  name: string,
  phone: string,
  privateEmail: boolean,
  privateLocation: boolean,
  privateMemberships: boolean,
  privateRSVP: boolean,
  role?: tRole,
  updated_at?: Date,
  username: string,
}>;

// getting/posting/deleting users by org membership
declare type tUserQuery = Partial<tUser> & tFormSubmit & tBaseQuery & Readonly<{
  password?: string,
}>;
