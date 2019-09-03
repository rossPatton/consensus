import {match} from 'react-router-dom';

export type tProps = {
  match: match & {params: {section: 'memberships' | 'profile' | 'events'}},
  session: tSession,
};
