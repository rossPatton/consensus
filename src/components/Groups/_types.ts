export type tProps = {
  asList?: boolean,
  count?: number,
  isEditable?: boolean,
  hoverIndex?: number,
  groups: ts.group[],
  roles: ts.roleMap[],
  showCategory?: boolean,
  showLocation?: boolean,
  showType?: boolean,
  showPending?: boolean,
};

export type tComponentProps = tProps & {
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, groupId: number) => void,
  pendingOrgs: ts.group[],
  setHover: (hoverIndex: number | null, groupType?: ts.role) => void,
};

export type tContainerProps = tProps & {
  deleteGroupByUserIdDispatch: (query: ts.deleteUserByGroupIdQuery) => ts.thunkPayload<ts.group>,
  dispatch: Function,
};

export type tState = {
  groupType: ts.role,
  hoverIndex: number | null,
};
