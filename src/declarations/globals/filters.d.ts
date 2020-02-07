declare type tPrivacyFilter = 'n/a' | 'public' | 'private';
declare type tPublishedFilter = 'n/a' | 'published' | 'draft';

declare type tPublishedFilterProps = Readonly<{
  items: tEvent[],
  onPublishedFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  publishedFilter: tPublishedFilter,
}>;

declare type tRoleFilterProps = Readonly<{
  items: tUser[],
  onRoleFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  roleFilter: tRole,
}>;

declare type tSearchFilterChange = (ev: React.ChangeEvent<HTMLInputElement>) => void;
declare type tSearchFilterProps = Readonly<{
  items: any[],
  onSearchChange: tOnSearchChange,
}>;

declare type tPrivacyFilterProps = Readonly<{
  items: any[],
  privacyFilter: tPrivacyFilter,
  onPrivacyFilterChange: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
}>;
