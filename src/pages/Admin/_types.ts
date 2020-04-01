import {History, Location} from 'history';
import {match} from 'react-router';

export type tStore = {
  session: tThunk<tSession>,
};

export type tAdminSections = match & {
  params: {
    page?: string,
    section: 'account'
      | 'deleteAccount'
      | 'deleteGroup'
      | 'meetings'
      | 'memberships'
      | 'planMeeting'
      | 'profile',
  }
};

export type tProps = {
  history: History,
  location: Location,
  match: tAdminSections,
  sessionThunk: tThunk<tSession>,
};
