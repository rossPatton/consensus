import dayJS from 'dayjs';
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {patchGroup} from '~app/redux';

import {tContainerProps, tState} from './_types';
import {DeleteGroupComponent} from './Component';

class DeleteGroupContainer extends PureComponent<tContainerProps, tState> {
  state = {
    error: '',
  };

  deleteGroup = async () => {
    const {session} = this.props;

    const oneWeekFromNow = dayJS().add(1, 'week').toISOString();
    const query = session.deletionDeadline
      ? {deletionDeadline: null}
      : {deletionDeadline: oneWeekFromNow};

    try {
      await this.props.patchGroupDispatch(query);
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
  patchGroupDispatch: (query: ts.groupUpsertQuery) => dispatch(patchGroup(query)),
});

const DeleteGroup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteGroupContainer);

export default DeleteGroup;
