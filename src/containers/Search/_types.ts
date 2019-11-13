type tOnSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => void;
type tRenderProps = {items: any[], onSearchChange: tOnSearchChange};

export interface tState {
  items: any[],
}

export interface tProps extends tState {
  render: (props: tRenderProps) => React.ReactNode,
}
