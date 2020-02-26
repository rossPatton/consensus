export type tProps = {
  className?: string,
  filterOptions?: {key: string, display: string}[],
  onCategoryChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onFilterOptionChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onPublishedFilterChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onRoleFilterChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
};
