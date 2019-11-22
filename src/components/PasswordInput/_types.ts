export type tProps = {
  errors?: {
    email?: string[],
    password?: string[],
  },
  id: string,
  hideRequiredMessage?: boolean,
  name?: string,
  newPassword?: boolean,
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  password: string,
  placeholder?: string,
  required?: boolean,
  title?: string,
};

export interface tComponentProps extends tProps {
  showPW: boolean,
  togglePWVisibility: () => void,
}

export type tState = {
  showPW: boolean,
};
