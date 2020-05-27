import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {deleteInvite, getInvites, postInvite} from '~app/redux';

import {Store, tContainerProps, tState, tStateUnion} from './_types';
import {InviteMemberComponent} from './Component';

class InviteMemberContainer extends Component<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    this.state = {
      hasMounted: false,
      username: '',
    };

    if (props.invitesThunk.fetched) return;
    props.getInvitesDispatch({groupId: props.session?.profile?.id});
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
    });
  }

  deleteInvite = async (
    ev: React.MouseEvent<HTMLButtonElement>,
    invite: ts.userInvite,
  ) => {
    ev.preventDefault();
    const {user, ...inviteQuery} = invite;
    await this.props.deleteInviteDispatch(inviteQuery);
  }

  submit = async (ev: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    ev.preventDefault();
    const {username} = this.state;
    const groupId = this.props.session?.profile?.id;

    await this.props.postInviteDispatch({
      groupId,
      username,
    });

    this.setState({
      username: '',
    });
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    return (
      <InviteMemberComponent
        {...this.state}
        {...this.props}
        deleteInvite={this.deleteInvite}
        submit={this.submit}
        updateState={this.updateState}
      />
    );
  }
}

const mapStateToProps = (store: Store) => ({
  invitesThunk: store.invites,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteInviteDispatch: (query: ts.inviteQuery) => dispatch(deleteInvite(query)),
  getInvitesDispatch: (query: ts.inviteQuery) => dispatch(getInvites(query)),
  postInviteDispatch: (query: ts.inviteQuery) => dispatch(postInvite(query)),
});

const InviteMember = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InviteMemberContainer);

export default InviteMember;
