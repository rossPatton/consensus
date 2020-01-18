export interface tState {
  items: any[],
}

export interface tProps extends tState {
  searchKey?: string,
  render: (props: tSearchFilterProps) => React.ReactNode,
}
