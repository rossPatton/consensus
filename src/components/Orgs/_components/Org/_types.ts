export type tProps = {
  asList?: boolean,
  count?: number,
  groupType?: tRole,
  hoverIndex?: number,
  index?: number,
  isEditable?: boolean,
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => void,
  org: tOrg,
  roles: tRoleMap[],
  setHover: (hoverIndex: number | null, groupType?: tRole) => void,
  showLocation?: boolean,
  showPending?: boolean,
};
