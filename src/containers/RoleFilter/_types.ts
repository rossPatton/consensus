export interface tProps {
  items: tUser[],
  render: (props: tRoleFilterProps) => React.ReactNode,
}

export interface tState {
  roleFilter: ts.role,
}
