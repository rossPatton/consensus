export type tState = {
  items: object[],
  search: string,
  searchKey: string,
};

export type tProps = {
  prefilter?: {key: string, value: string} | null,
  items: object[],
  searchKey?: string,
  render: (props: ts.searchFilterProps) => React.ReactNode,
};
