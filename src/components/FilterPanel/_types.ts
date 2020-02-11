export type tProps = {
  className?: string,
  onPrivacyFilterChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onRoleFilterChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void,
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
};
