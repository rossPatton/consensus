// import dayJS from 'dayjs';
import _ from 'lodash';
// import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {postInvite} from '~app/redux';
import {tContainerProps, tState, tStateUnion} from './_types';
import {InviteMemberComponent} from './Component';

class InviteMemberContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    this.state = {
      hasMounted: false,
      username: '',
    };
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
    });
  }

  submit = async () => {
    const {username} = this.state;
    const groupId = this.props.session?.profile?.id;

    await this.props.postInviteDispatch({
      groupId,
      username,
    });

    this.setState({
      username: '',
    })
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
        submit={this.submit}
        session={this.props.session}
        updateState={this.updateState}
      />
    );
  }
}

const mapStateToProps = (store: {session: ts.thunk<ts.session>}) => ({
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  postInviteDispatch: (query: ts.inviteQuery) => dispatch(postInvite(query)),
});

const InviteMember = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InviteMemberContainer);

export default InviteMember;
