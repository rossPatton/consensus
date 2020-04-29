import dayJS from 'dayjs';
import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {login, patchAccount} from '~app/redux';

import {tContainerProps, tState, tStateUnion} from './_types';
import {DeleteGroupComponent} from './Component';

class DeleteGroupContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    this.state = {
      hasMounted: false,
      currentPassword: '',
    };
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
    });
  }

  deleteGroup = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {currentPassword} = this.state;
    const {session} = this.props;

    const oneWeekFromNow = dayJS().add(1, 'week').toISOString();
    const query = session.deletionDeadline
      ? {currentPassword, deletionDeadline: null}
      : {currentPassword, deletionDeadline: oneWeekFromNow};

    this.props.patchAccountDispatch(query)
      .then(() => {
        return this.props.loginDispatch({
          username: session.login,
          password: this.state.currentPassword,
        });
      })
      .then(() => {
        return this.setState({
          currentPassword: '',
        });
      })
      .catch(loglevel.error);
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    return (
      <DeleteGroupComponent
        {...this.state}
        deleteGroup={this.deleteGroup}
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
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
  patchAccountDispatch: (query: ts.accountQuery) => dispatch(patchAccount(query)),
});

const DeleteGroup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteGroupContainer);

export default DeleteGroup;
