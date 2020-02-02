export type tState = {
  search: string,
};

export type tProps = {
  items: object[],
  searchKey?: string,
  render: (props: tSearchFilterProps) => React.ReactNode,
};
