export type tUser = {
  fname: string,
  lname: string,
  username: string,
};

export type tComponentProps = {
  users: tUser[],
};

export type tThunkProps = {
  data: tUser[],
  error?: Error,
  isLoading: boolean,
};

export type tContainerProps = {
  getUsers: Function,
  users: tThunkProps,
};
