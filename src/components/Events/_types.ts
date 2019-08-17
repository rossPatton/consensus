export type tComponentProps = {
  events: tEvent[],
  // render mobile/sidebar version
  tiny: boolean,
};

export type tContainerProps = tComponentProps & {
  session: tSession,
};
