export type tProps = {
  asList?: boolean,
  count?: number,
  isEditable?: boolean,
  hoverIndex?: number,
  groups: tGroup[],
  roles: ts.roleMap[],
  showCategory?: boolean,
  showLocation?: boolean,
  showType?: boolean,
  showPending?: boolean,
};

export type tComponentProps = tProps & {
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, groupId: number) => void,
  pendingOrgs: tGroup[],
  setHover: (hoverIndex: number | null, groupType?: ts.role) => void,
};

export type tContainerProps = tProps & {
  deleteOrgByUserIdDispatch: (query: tDeleteUserByGroupIdQuery) => tThunkPayload<tGroup>,
};

export type tState = {
  groupType: ts.role,
  hoverIndex: number | null,
};
