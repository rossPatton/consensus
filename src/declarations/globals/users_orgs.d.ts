// generic accounts_roles query

// get all members of an org
declare type tUsersByOrgIdQuery = tBaseQuery & {
  orgId: string | number,
};

declare type tOrgsByUserIdQuery = tBaseQuery & {
  userId: string | number,
};

// we basically never just get an invidual member of an org
// but when joining a group we post one, same shape as above
// no userId needed since you have to be logged in for it to work
declare type tPostUserByOrgIdQuery = tUsersByOrgQuery;

// you can both leave an org yourself or be removed, so userId is needed here
declare type tDeleteUserByOrgIdQuery = tUserByOrgQuery & {
  userId: string | number,
};

// an org can change your user role, so all values needed
declare type tPatchUserRoleQuery = tDeleteUserByOrgQuery & {
  role: tRole,
}
