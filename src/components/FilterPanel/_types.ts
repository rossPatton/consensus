export type tProps = {
  className?: string,
  filterOptions?: {key: string, display: string}[],
  id?: string,
  memberName?: string,
  modName?: string,
  onCategoryChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onFilterOptionChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onPublishedFilterChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onRoleFilterChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  publishedFilter?: tPublishedFilter,
};
