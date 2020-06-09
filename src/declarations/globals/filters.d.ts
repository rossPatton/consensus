namespace ts {
  declare type filterEnum = 'n/a' | 'upcoming' | 'past';
  declare type inputChange = (ev: React.ChangeEvent<HTMLInputElement>) => void;
  declare type selectChange = (ev: React.ChangeEvent<HTMLSelectElement>) => void;

  declare type publishedFilterProps = Readonly<{
    items: ts.meeting[],
    onPublishedFilterChange: ts.selectChange,
    publishedFilter: filterEnum,
  }>;

  declare type roleFilterProps = Readonly<{
    items: ts.user[],
    onRoleFilterChange: selectChange,
    roleFilter: ts.role,
  }>;

  declare type searchFilterProps = Readonly<{
    items: any[],
    onFilterOptionChange?: selectChange,
    onSearchChange: inputChange,
  }>;

  declare type tokenProps = Readonly<{
    email: string,
    sendToken: (email?: string) => void,
  }>;
}
