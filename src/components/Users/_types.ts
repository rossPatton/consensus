export type tState = {
  role: tRole,
};

export type tRoleOpts = {
  orgId: number,
  role: tRole,
  userId: number,
};

export type tProps = {
  removeUser?: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  setUserRole?: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
  sessionRole: tRole, // to distinguish from user roles, and to shut up eslint
}

export type tComponentProps = tProps & {
  isEditable: boolean,
};
