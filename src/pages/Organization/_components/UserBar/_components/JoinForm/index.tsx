import loglevel from 'loglevel';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {postRoleSuccess, postUserByOrgId} from '../../../../../../redux';
import {tProps, tStore} from './_types';
import {JoinFormComponent} from './Component';

class JoinFormContainer extends React.PureComponent<tProps> {
  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const {dispatch, orgId} = this.props;

    this.props.postNewUserByOrgIdDispatch({orgId})
      .then(() => dispatch(postRoleSuccess({orgId, role: 'member'})))
      .catch(loglevel.error);
  }

  render() {
    const {role, session} = this.props;

    if (role) {
      return (
        <span className="bgWhite brdA1 br8 lh1 pL2 pR2 mR2 fx aiCtr">
          <span className="fs4 mR1">✔</span>
          <span className="ttCap">{role}</span>
        </span>
      );
    }

    if (!session.isAuthenticated) {
      return (
        <Link
          to="/signup"
          className="bgWhite hvrBgGrey1 brdA1 br8 p1 pL2 pR2 mR2 trans1">
          Join This Organization
        </Link>
      );
    }

    return (
      <JoinFormComponent
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.usersByOrg.isLoading,
  usersByOrg: store.usersByOrg.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  dispatch,
  postNewUserByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    dispatch(postUserByOrgId(query)),
});

export const JoinForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinFormContainer);
