import loglevel from 'loglevel';
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {postRoleSuccess, postUserByGroupId} from '~app/redux';

import {tProps, tStore} from './_types';

class JoinFormContainer extends React.PureComponent<tProps> {
  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const {dispatch, group, session} = this.props;
    const role = group.type === 'public' ? 'member' : 'pending';
    const userId = session.profile.id;

    this.props.postNewUserByGroupIdDispatch({
      allowNonVerified: group.allowNonVerified,
      groupId: group.id,
      role,
      userId,
    })
      .then(() => dispatch(postRoleSuccess({groupId: group.id, role})))
      .catch(loglevel.error);
  }

  render() {
    const {group, role, session} = this.props;

    if (role) {
      return (
        <span className="text-white text-sm">
          <span className="mr-1">✔</span>
          <span className="capitalize">{role}</span>
        </span>
      );
    }

    if (!session.isAuthenticated) {
      return (
        <Link
          to="/signup"
          className="btn p-1 text-sm">
          Join this Group
        </Link>
      );
    }

    if (!session.isVerified && !group.allowNonVerified) {
      return (
        <span className="text-sm p-1 white">
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
            <button className="btn p-1 text-sm">
              {group.type === 'public' && 'Join'}
              {group.type === 'private' && 'Request'}
            </button>
          </legend>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.usersByGroupId.isLoading,
  group: store.group.data,
  session: store.session.data,
  usersByGroupId: store.usersByGroupId.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  dispatch,
  postNewUserByGroupIdDispatch: (query: ts.usersByGroupIdQuery) =>
    dispatch(postUserByGroupId(query)),
});

const JoinForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinFormContainer);

export default JoinForm;
