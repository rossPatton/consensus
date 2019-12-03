export type tProps = {
  options: string[],
  submitVote: (vote: any) => void,
  tiny?: boolean,
  userVoted: boolean,
};

export type tStateUnion = 'Yes' | 'No' | 'Abstain' | 'n/a';

export type tState = {
  selectedOptions: string[],
};

export type tComponentProps = tProps & tState & {
  selectOption: (ev: any) => void,
};
