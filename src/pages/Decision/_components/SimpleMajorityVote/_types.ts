export type tProps = {
  options: tCustomVoteResults,
  submitVote: (vote: any) => void,
  tiny?: boolean,
  userVoted: boolean,
};

export type tState = {
  selectedOption: string,
};

export type tContainerProps = tProps & {
  vote: string,
};

export type tComponentProps = tProps & tState & {
  selectOption: (ev: any) => void,
};
