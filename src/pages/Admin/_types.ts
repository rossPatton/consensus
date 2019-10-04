import {match} from 'react-router';

export type tStore = {
  session: tThunk<tSession>,
};

export type tAdminSections = match & {
  params: {
    page?: string,
    section: 'account' | 'decisions' | 'memberships' | 'profile' | 'events',
  }
};

export type tProps = {
  match: tAdminSections,
  session: tSession,
};
