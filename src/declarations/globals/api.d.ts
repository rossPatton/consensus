// typical generic id-based db query, client side
declare type tIdQueryC = {
  // exclude an id, or something else
  exclude?: number,
  // id to search by
  id: number,
  // filter out private events/decisions/etc if user is not logged in
  isPublic?: boolean,
  limit?: number,
  offset?: number,

}

// typical generic id-based db query
declare type tIdQueryS = {
  // exclude an id, or something else
  exclude?: string,
  // id to search by
  id: string,
  // filter out private events/decisions/etc if user is not logged in
  isPublic?: 'true' | 'false', // TODO dont use boolean here?
  limit?: string,
  offset?: string,
}

declare type tEventQueryC = tIdQueryC & {
  isDraft?: boolean,
  showPast?: boolean,
}

declare type tEventQueryS = tIdQueryS & {
  isDraft?: 'true' | 'false',
  showPast?: 'true' | 'false',
}

// getting/posting/deleting users by org membership
declare type tDeleteUserOrgQuery = {
  orgId: number,
  userId: number,
};

// patching an existing user role by org membership
declare type tPatchUserRoleQuery = {
  orgId: number,
  role: tRole,
  userId: number,
}

declare type tPatchOrgQuery = {
  category: tCategory,
  description: string,
  eventPrivacy: tEventPrivacy,
  gate: tGate,
  id: number,
}

declare type tApiOpts = {
  credentials?: 'include' | 'same-origin',
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST',
  path: string,
  query?: any,
}

declare type tPostEventQuery = {
  category: string,
  date: string,
  description: string,
  endDate: string,
  isDraft: boolean,
  isPrivate: boolean,
  location: string,
  locationLink: string,
  orgId: number,
  title: string,
};
