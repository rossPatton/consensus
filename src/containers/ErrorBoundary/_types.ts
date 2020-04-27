export type tProps = {
  error?: any,
  isSubPage?: boolean,
  status?: ts.statusUnion,
}

export type tState = tProps & {
  info: ts.infoUnon | null,
};
