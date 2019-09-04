export type tProps = {
  errors?: {
    email?: string[],
    password?: string[],
  },
  id: string,
  name?: string,
  newPassword?: boolean,
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  password: string,
  placeholder?: string,
  required?: boolean,
  title?: string,
};

export type tComponentProps = tProps & {
  showPW: boolean,
  togglePWVisibility: () => void,
};

export type tState = {
  showPW: boolean,
};
