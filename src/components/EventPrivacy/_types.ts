export type tProps = {
  isPrivate: boolean,
};

export type tContainerProps = tProps & {
  session: tSession,
};

export type tStore = {
  session: tThunk<tSession>,
};
