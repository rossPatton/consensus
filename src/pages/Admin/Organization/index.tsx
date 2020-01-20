import React, {PureComponent} from 'react';
import {Redirect} from 'react-router';

import {tProps} from './_types';
import {OrgAdminComponent} from './Component';

export class OrgAdmin extends PureComponent<tProps> {
  render() {
    const {match, session} = this.props;

    return (
      <>
        {!session.isAuthenticated && <Redirect to="/login" />}
        {session.isAuthenticated && (
          <OrgAdminComponent
            match={match}
            session={session}
          />
        )}
      </>
    );
  }
}
