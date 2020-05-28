import _ from 'lodash';
import loglevel from 'loglevel';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '~app/containers';
import {deleteInvite, getInvites, postGroupByUserIdSuccess, postUserByGroupId} from '~app/redux';

import {Store, tContainerProps, tState, tStateUnion} from './_types';
import {InvitationsComponent} from './Component';

class InvitationsContainer extends Component<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    this.state = {
      hasMounted: false,
      username: '',
    };

    props.getInvitesDispatch({
      userId: props.session?.profile?.id,
    });
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
    });
  }

  acceptInvite = async (
    ev: React.MouseEvent<HTMLButtonElement>,
    invite: ts.userInvite,
  ) => {
    ev.preventDefault();
    const {id} = this.props.session?.profile;
    let newUser;
    try {
      newUser = await this.props.postNewUserByGroupIdDispatch({
        allowNonVerified: invite.group.allowNonVerified,
        groupId: invite.groupId,
        userId: id,
        role: invite.type,
      });
    } catch (err) {
      loglevel.error(err);
    }

    const {group, ...inviteQuery} = invite;
    if (newUser.payload.id) {
      // remove invite from invitations table and state
      await this.props.deleteInviteDispatch(inviteQuery);
      // add new group to list of user's groups
      await this.props.dispatch(postGroupByUserIdSuccess({...invite.group}));
    }
  }

  deleteInvite = async (
    ev: React.MouseEvent<HTMLButtonElement>,
    invite: ts.userInvite,
  ) => {
    ev.preventDefault();
    const {group, ...inviteQuery} = invite;
    await this.props.deleteInviteDispatch(inviteQuery);
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    return (
      <GenericLoader
        isLoading={this.props.invitesThunk.isLoading}
        render={() => (
          <InvitationsComponent
            {...this.state}
            {...this.props}
            acceptInvite={this.acceptInvite}
            deleteInvite={this.deleteInvite}
            updateState={this.updateState}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: Store) => ({
  invitesThunk: store.invites,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  dispatch,
  deleteInviteDispatch: (query: ts.inviteQuery) => dispatch(deleteInvite(query)),
  postNewUserByGroupIdDispatch: (query: ts.usersByGroupIdQuery) =>
    dispatch(postUserByGroupId(query)),
  getInvitesDispatch: (query: ts.inviteQuery) => dispatch(getInvites(query)),
});

const Invitations = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvitationsContainer);

export default Invitations;
