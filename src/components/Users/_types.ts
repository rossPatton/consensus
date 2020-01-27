import {match} from 'react-router';

type tMatch = match & {
  params: {
    page?: string,
    [key: string]: string,
  }
};

export type tState = {
  role: tRole,
};

export type tRoleOpts = {
  orgId: number,
  role: tRole,
  userId: number,
};

type tProps = {
  removeUser?: (ev: React.MouseEvent<HTMLButtonElement>, id: number) => void,
  setUserRole?: (ev: React.ChangeEvent<HTMLSelectElement>, id: number) => void,
  users: tUser[],
  sessionRole: tRole, // to distinguish from user roles, and to shut up eslint
}

export interface tContainerProps extends tProps {
  match: tMatch,
}

export interface tComponentProps extends tProps {
  isEditable: boolean,
}
