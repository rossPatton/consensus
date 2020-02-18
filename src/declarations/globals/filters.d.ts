declare type tPublishedFilter = 'n/a' | 'published' | 'draft';
declare type tInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => void;
declare type tSelectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => void;

declare type tPublishedFilterProps = Readonly<{
  items: tEvent[],
  onPublishedFilterChange: tSelectChange,
  publishedFilter: tPublishedFilter,
}>;

declare type tRoleFilterProps = Readonly<{
  items: tUser[],
  onRoleFilterChange: tSelectChange,
  roleFilter: tRole,
}>;

declare type tSearchFilterProps = Readonly<{
  items: any[],
  onFilterOptionChange: tSelectChange,
  onSearchChange: tInputChange,
}>;

// maybe make a new file for misc types like this?
declare type tInfoUnion = ErrorInfo | string | null
declare type tStatusUnion = 200 | 204 | 400 | 404 | 500;
