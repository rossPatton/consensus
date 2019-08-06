export type tUser = {
  fname: string,
  lname: string,
  username: string,
};

export type tComponentProps = {
  users: tUser[],
};

export type tContainerProps = {
  getUsers: Function,
  isLoading: boolean,
  users: tUser[],
};
