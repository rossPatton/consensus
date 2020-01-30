// everything gets turned into strings
export type tUserPostServerQuery = {
  email: string,
  isFormSubmit?: boolean,
  login: string,
  username: string,
  password: string,
};

export type tUserPatchServerQuery = Partial<tUser> & {
  isFormSubmit?: boolean,
  password: string,
};
