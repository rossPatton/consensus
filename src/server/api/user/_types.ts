// everything gets turned into strings
export type tUserPostServerQuery = tFormSubmit & {
  email: string,
  login: string,
  username: string,
  password: string,
};
