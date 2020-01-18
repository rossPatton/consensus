import {match} from 'react-router';

export type tProps = {
  decisions: tDecision[],
  match: match & {params: {page?: string}},
  tiny?: boolean,
};
