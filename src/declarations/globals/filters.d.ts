declare type tPublishedFilter = 'n/a' | 'upcoming' | 'past';
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

// @TODO maybe i should make a file for misc types like this?
declare type tInfoUnion = ErrorInfo | string | null;

// 200 === ok
// 204 === no error, but nothing was found in the db
// 400 === bad request. query or params or something are not correct
// 401 === unauthorized. user is trying to see a page they don't have credentials for
// 404 === route not found, or potentially a 204 on the server that we render as 404
// 500 === something went wrong. probably a code error. shit is fucked
declare type tStatusUnion = 200 | 204 | 400 | 401 | 404 | 500;
