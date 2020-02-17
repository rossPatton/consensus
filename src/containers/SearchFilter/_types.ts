export type tState = {
  search: string,
  searchKey: string,
};

export type tProps = {
  items: object[],
  searchKey?: string,
  render: (props: tSearchFilterProps) => React.ReactNode,
};
