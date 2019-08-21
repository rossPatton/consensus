export type tProps = {
  logout: (ev: React.MouseEvent<HTMLButtonElement>) => void,
  session: tSession,
}

export type tContainerProps = tProps & {
  logOutOfSession: () => void,
}
