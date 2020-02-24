export type tProps = {
  asList?: boolean,
  count?: number,
  isEditable?: boolean,
  hoverIndex?: number,
  orgs: tOrg[],
  roles: tRoleMap[],
  showLocation?: boolean,
  showPending?: boolean,
};

export type tComponentProps = tProps & {
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => void,
  pendingOrgs: tOrg[],
  setHover: (hoverIndex: number | null, groupType?: tRole) => void,
};

export type tContainerProps = tProps & {
  deleteOrgByUserIdDispatch: (query: tDeleteUserByOrgIdQuery) => tThunkPayload<tOrg>,
};

export type tState = {
  groupType: tRole,
  hoverIndex: number | null,
};
