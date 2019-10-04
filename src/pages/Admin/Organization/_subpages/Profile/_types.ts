export type tStateUnion = keyof tOrg;
export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type tContainerProps = {
  patchOrg: (query: any) => any,
  session: tSession,
};

export type tComponentProps = tOrg & {
  onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void,
  // setImage: (ev: React.ChangeEvent<HTMLInputElement> | null) => void,
  // toggleChecked: () => void,
  updateState: (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => void,
};
