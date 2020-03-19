import loglevel from 'loglevel';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {postRoleSuccess, postUserByOrgId} from '../../../../redux';
import {tProps, tStore} from './_types';

class JoinFormContainer extends React.PureComponent<tProps> {
  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const {dispatch, org, session} = this.props;
    const role = org.type === 'public' ? 'member' : 'pending';
    const userId = session.profile.id;

    this.props.postNewUserByOrgIdDispatch({
      allowNonVerified: org.allowNonVerified,
      orgId: org.id,
      role,
      userId,
    })
      .then(() => dispatch(postRoleSuccess({orgId: org.id, role})))
      .catch(loglevel.error);
  }

  render() {
    const {org, role, session} = this.props;

    if (role) {
      return (
        <span className="mR2 fs6 white lh1">
          <span className="mR1">✔</span>
          <span className="ttCap">{role}</span>
        </span>
      );
    }

    if (!session.isAuthenticated) {
      return (
        <Link
          to="/signup"
          className="bgWhite fs6 br4 lh1 p1 pL2 pR2">
          Join this Group
        </Link>
      );
    }

    if (!session.isVerified && !org.allowNonVerified) {
      return (
        <span className="mR2 fs6 white lh1">
          Verify your account to join
        </span>
      );
    }

    return (
      <form
        method="POST"
        onSubmit={this.onSubmit}
        action="/api/v1/usersByOrg">
        <fieldset>
          <legend>
            <button className="bgWhite fs6 br4 lh1 p1 pL2 pR2">
              {org.type === 'public' && 'Join'}
              {org.type === 'private' && 'Request'}
            </button>
          </legend>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.usersByOrgId.isLoading,
  org: store.org.data,
  session: store.session.data,
  usersByOrgId: store.usersByOrgId.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  dispatch,
  postNewUserByOrgIdDispatch: (query: tUsersByOrgIdQuery) =>
    dispatch(postUserByOrgId(query)),
});

const JoinForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinFormContainer);

export default JoinForm;
