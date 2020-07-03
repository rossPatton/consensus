namespace ts {
  declare type user = ts.baseAccount & Readonly<{
    bio?: string,
    name: string,
    privateMemberships: boolean,
    privateRSVP: boolean,
    role?: ts.role,
    username: string,
  }>;

  // getting/posting/deleting users by org membership
  declare type userQuery = Partial<ts.user> & ts.baseQuery;
  declare type usersQuery = userQuery & {
    ids: number[],
  };
}
