export type tProps = {
  error?: any,
  isSubPage?: boolean,
  status?: tStatusUnion,
}

export type tState = tProps & {
  info: tInfoUnion | null,
};
