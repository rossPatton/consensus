export type tProps = {
  asList?: boolean,
  count?: number,
  isEditable?: boolean,
  hoverIndex?: number,
  orgs: tGroup[],
  roles: tRoleMap[],
  showCategory?: boolean,
  showLocation?: boolean,
  showType?: boolean,
  showPending?: boolean,
};

export type tComponentProps = tProps & {
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => void,
  pendingOrgs: tGroup[],
  setHover: (hoverIndex: number | null, groupType?: tRole) => void,
};

export type tContainerProps = tProps & {
  deleteOrgByUserIdDispatch: (query: tDeleteUserByOrgIdQuery) => tThunkPayload<tGroup>,
};

export type tState = {
  groupType: tRole,
  hoverIndex: number | null,
};
