declare type ValueOf<T> = T[keyof T];

declare interface tFetchResponse<T = any> extends Response {
  json<P = T>(): Promise<P>
};

// declare type tDecisionFilterProps = {
//   decisionFilter: tDecisionType,
//   items: tDecision[],
//   onDecisionTypeChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
// }

declare type tRoleFilterProps = {
  items: tUser[],
  onRoleFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  roleFilter: tRole,
};

declare type tSearchFilterChange = (ev: React.ChangeEvent<HTMLInputElement>) => void;
declare type tSearchFilterProps = {
  items: any[],
  onSearchChange: tOnSearchChange
};

// member => can RSVP to events, partake in decisions
// facilitator => can create events, decisions
// admin => can do all the above plus manage the group
// n/a => inputs cant have null values, so we use this sometimes
// null => often happens if we're trying to tie roles to users, and there's no match
declare type tRole = 'member' | 'facilitator' | 'admin' | 'n/a' | null;
declare type tPrivacyFilter = 'n/a' | 'public' | 'private';
declare type tPublishedFilter = 'n/a' | 'published' | 'draft';

declare type tRoleMap = {
  orgId: number,
  role: tRole,
}

declare type tAccountRoleRelation = tRoleMap & {
  id: number,
  userId: number,
}

declare type tPrivacyFilterProps = {
  items: any[],
  privacyFilter: tPrivacyFilter,
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
};
