namespace ts {
  declare type userInvite = {
    groupId: number,
    userId: number,
    type: 'member' | 'mod',
  };

  declare type inviteQuery = Partial<userInvite> & {
    username?: string,
  };

  // get all members of an org by id
  declare type usersByGroupIdQuery = ts.baseQuery & {
    allowNonVerified?: boolean,
    noPending?: 'true' | 'false',
    groupId: string | number,
    userId?: string | number,
    role?: ts.role,
  };

  // get all group that a user belongs to by userId
  declare type groupsByUserIdQuery = ts.baseQuery & {
    noPending?: boolean,
    userId: string | number,
  };

  // you can both leave an org yourself or be removed, so userId is needed here
  declare type deleteUserByGroupIdQuery = tUserByOrgQuery & {
    userId: string | number,
  };

  // an org can change your user role, so all values needed
  declare type patchUserRoleQuery = tDeleteUserByOrgQuery & Readonly<{
    role: ts.role,
  }>;
}
