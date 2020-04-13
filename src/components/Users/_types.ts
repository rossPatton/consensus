export type tState = {
  showMobileControls: number | null,
};

export type tRoleOpts = {
  orgId: number,
  role: tRole,
  userId: number,
};

export type tProps = {
  count?: number,
  memberName?: string,
  modName?: string,
  removeUser?: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  setUserRole?: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
  sessionRole?: tRole, // to distinguish from user roles, and to shut up eslint
}

export type tComponentProps = tMediaContext & tProps & tState & {
  isEditable: boolean,
  toggleMobileControls: (index: number) => void,
};
