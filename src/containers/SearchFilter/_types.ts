export type tState = {
  search: string,
  searchKey: string,
};

export type tProps = {
  filterBy?: {key: string, value: string} | null,
  items: object[],
  searchKey?: string,
  render: (props: ts.searchFilterProps) => React.ReactNode,
};
