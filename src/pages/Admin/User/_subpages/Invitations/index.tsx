import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '~app/containers';
import {deleteInvite, getInvites} from '~app/redux';

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

  deleteInvite = async (
    ev: React.MouseEvent<HTMLButtonElement>,
    invite: ts.userInvite,
  ) => {
    ev.preventDefault();
    const {user, ...inviteQuery} = invite;
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
  deleteInviteDispatch: (query: ts.inviteQuery) => dispatch(deleteInvite(query)),
  getInvitesDispatch: (query: ts.inviteQuery) => dispatch(getInvites(query)),
});

const Invitations = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvitationsContainer);

export default Invitations;
