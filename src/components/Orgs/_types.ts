export type tProps = {
  asList?: boolean,
  count?: number,
  isEditable?: boolean,
  isHovering?: boolean,
  orgs: tOrg[],
  roles: tRoleMap[],
  showLocation?: boolean,
};

export type tComponentProps = tProps & {
  leaveOrg: (ev: React.MouseEvent<HTMLButtonElement>, orgId: number) => void,
  setHover: (isHovering: boolean) => void,
};

export type tContainerProps = tProps & {
  deleteOrgByUserIdDispatch: (query: tDeleteUserByOrgIdQuery) => tThunkPayload<tOrg>,
};
