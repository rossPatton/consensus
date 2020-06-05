namespace ts {
  declare type user = ts.baseAccount & Readonly<{
    bio?: string,
    name: string,
    privateEmail: boolean,
    privateMemberships: boolean,
    privateRSVP: boolean,
    role?: ts.role,
    username: string,
  }>;

  // getting/posting/deleting users by org membership
  declare type userQuery = Partial<ts.user> & ts.baseQuery;
}
