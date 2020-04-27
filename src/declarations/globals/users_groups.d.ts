// get all members of an org by id
declare type tUsersByGroupIdQuery = tBaseQuery & {
  allowNonVerified?: boolean,
  noPending?: 'true' | 'false',
  groupId: string | number,
  userId?: string | number,
  role?: ts.role,
};

// get all group that a user belongs to by userId
declare type tGroupsByUserIdQuery = tBaseQuery & {
  noPending?: boolean,
  userId: string | number,
};

// you can both leave an org yourself or be removed, so userId is needed here
declare type tDeleteUserByGroupIdQuery = tUserByOrgQuery & {
  userId: string | number,
};

// an org can change your user role, so all values needed
declare type tPatchUserRoleQuery = tDeleteUserByOrgQuery & Readonly<{
  role: ts.role,
}>;
