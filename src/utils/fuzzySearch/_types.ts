export type tObjWithScore = {
  [key: string]: any,
  score: number,
};

export type tOpts = {
  // if dealing with a big list, we might want to filter it first by some criteria
  prefilter?: {key: string, value: string},
  input?: any[],
  key?: string,
  search?: string,
};
