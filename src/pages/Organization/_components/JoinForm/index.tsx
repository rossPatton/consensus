import cx from 'classnames';
import loglevel from 'loglevel';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {postRoleSuccess, postUserByOrgId} from '../../../../redux';
import {tProps, tStore} from './_types';

class JoinFormContainer extends React.PureComponent<tProps> {
  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const {dispatch, org} = this.props;

    this.props.postNewUserByOrgIdDispatch({orgId: org.id})
      .then(() => dispatch(postRoleSuccess({orgId: org.id, role: 'member'})))
      .catch(loglevel.error);
  }

  render() {
    const {org, role, session} = this.props;

    if (role) {
      return (
        <span
          className={cx({
            'br8 lh1 p2 fx aiCtr fs7': true,
            'bgBlue white': role === 'admin',
            'bgGreenLite': role === 'facilitator',
            'bgYellowLite': role === 'member',
          })}>
          <span className="mR1">✔</span>
          <span className="ttCap">{role}</span>
        </span>
      );
    }

    if (!session.isAuthenticated) {
      return (
        <Link
          to="/signup"
          className="bgGrey1 brdA1 br8 fs7 hvrBgGrey3 br8 p2 trans1 lh1">
          Join this Group
        </Link>
      );
    }

    return (
      <form
        method="POST"
        onSubmit={this.onSubmit}
        action="/api/v1/usersByOrg">
        <fieldset>
          <legend>
            <button className="bgGrey1 br8 fs7 hvrBgGrey3 br8 p2 trans1">
              {org.type === 'public' && 'Join this Group'}
              {org.type === 'private' && 'Apply for Membership'}
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
