import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {deleteGroup, logout} from '~app/redux';

import {tContainerProps, tState} from './_types';
import {DeleteGroupComponent} from './Component';

class DeleteGroupContainer extends PureComponent<tContainerProps, tState> {
  state = {
    error: '',
  };

  deleteGroup = async () => {
    // const {session} = this.props;

    // const oneWeekFromNow = dayJS().add(1, 'week').toISOString();
    // const query = session.deletionDeadline
    //   ? {deletionDeadline: null}
    //   : {deletionDeadline: oneWeekFromNow};

    try {
      await this.props.deleteGroupDispatch();
      await this.props.logoutDispatch();
      window.location.reload();
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }
  }

  render() {
    return (
      <DeleteGroupComponent
        {...this.state}
        deleteGroup={this.deleteGroup}
        session={this.props.session}
      />
    );
  }
}

const mapStateToProps = (store: {session: ts.thunk<ts.session>}) => ({
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteGroupDispatch: () => dispatch(deleteGroup()),
  logoutDispatch: () => dispatch(logout()),
});

const DeleteGroup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteGroupContainer);

export default DeleteGroup;
