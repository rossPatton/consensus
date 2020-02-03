declare type tPrivacyFilter = 'n/a' | 'public' | 'private';
declare type tPublishedFilter = 'n/a' | 'published' | 'draft';

declare type tPublishedFilterProps = {
  items: tEvent[],
  onPublishedFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  publishedFilter: tPublishedFilter,
};

declare type tRoleFilterProps = {
  items: tUser[],
  onRoleFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  roleFilter: tRole,
};

declare type tSearchFilterChange = (ev: React.ChangeEvent<HTMLInputElement>) => void;
declare type tSearchFilterProps = {
  items: any[],
  onSearchChange: tOnSearchChange,
};

declare type tPrivacyFilterProps = {
  items: any[],
  privacyFilter: tPrivacyFilter,
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
};
