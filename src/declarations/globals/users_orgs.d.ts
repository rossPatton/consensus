// get all members of an org by id
declare type tUsersByOrgIdQuery = tBaseQuery & {
  allowNonVerified?: boolean,
  noPending?: 'true' | 'false',
  orgId: string | number,
  userId?: string | number,
  role?: tRole,
};

// get all orgs that a user belongs to by userId
declare type tGroupsByUserIdQuery = tBaseQuery & {
  noPending?: boolean,
  userId: string | number,
};

// you can both leave an org yourself or be removed, so userId is needed here
declare type tDeleteUserByOrgIdQuery = tUserByOrgQuery & {
  userId: string | number,
};

// an org can change your user role, so all values needed
declare type tPatchUserRoleQuery = tDeleteUserByOrgQuery & Readonly<{
  role: tRole,
}>;
