import {Location} from 'history';
import {match} from 'react-router';

export type tStore = {
  session: tThunk<tSession>,
};

export type tAdminSections = match & {
  params: {
    page?: string,
    section: 'account'
      | 'events'
      | 'memberships'
      | 'pendingApprovals'
      | 'planMeeting'
      | 'profile',
  }
};

export type tProps = {
  location: Location,
  match: tAdminSections,
  sessionThunk: tThunk<tSession>,
};
