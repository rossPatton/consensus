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

export type tComponentProps = tProps & ts.mediaContext & {
  showPW: boolean,
  togglePWVisibility: (showPW: boolean) => void,
};

export type tState = {
  showPW: boolean,
};
