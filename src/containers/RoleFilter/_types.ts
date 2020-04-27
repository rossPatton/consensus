export interface tProps {
  items: ts.user[],
  render: (props: ts.roleFilterProps) => React.ReactNode,
}

export interface tState {
  roleFilter: ts.role,
}
