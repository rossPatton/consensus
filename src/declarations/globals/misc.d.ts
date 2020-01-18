declare type ValueOf<T> = T[keyof T];

declare interface tFetchResponse<T = any> extends Response {
  json<P = T>(): Promise<P>
};

declare type tDecisionFilterProps = {
  decisionFilter: tDecisionType,
  items: tDecision[],
  onDecisionTypeChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
}

declare type tRoleFilterProps = {
  items: tUser[],
  onRoleFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  roleFilter: tRole,
};

declare type tSearchFilterChange = (ev: React.ChangeEvent<HTMLInputElement>) => void;
declare type tSearchFilterProps = {
  items: any[], onSearchChange: tOnSearchChange
};

// member => can RSVP to events, partake in decisions
// facilitator => can create events, decisions
// admin => can do all the above plus manage the group
// n/a => inputs cant have null values, so we use this sometimes
// null => often happens if we're trying to tie roles to users, and there's no match
declare type tRole = 'member' | 'facilitator' | 'admin' | 'n/a' | null;
declare type tPrivacyFilter = 'n/a' | 'public' | 'private';
declare type tPublishedFilter = 'n/a' | 'published' | 'draft';

declare interface tRoleMap {
  orgId: number,
  role: tRole,
}

declare interface tAccountRoleRelation extends tRoleMap {
  id: number,
  userId: number,
}

declare interface tUserOrgRelation {
  id: number,
  userId: number,
  orgId: number,
}

// typical id-based db query
declare interface tIdQuery {
  // exclude an id, or something else
  exclude?: number,
  // id to search by
  id: number,
  // filter out private events/decisions/etc if user is not logged in
  isPublic?: boolean,
  limit?: number,
  offset?: number,
}

// once the above values are passed to the server, they become strings
declare interface tIdQueryServer {
  query: {
    exclude?: string,
    id: string,
    isPublic?: boolean,
    limit?: string,
    offset?: string,
  }
}

declare interface tLocationQueryServer {
  query: tDirectoryParams,
}
