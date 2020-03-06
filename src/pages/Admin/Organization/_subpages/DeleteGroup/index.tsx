import dayJS from 'dayjs';
import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../../components';
import {ErrorBoundary} from '../../../../../containers';
import {login, patchAccount} from '../../../../../redux';
import {tContainerProps, tState, tStateUnion} from './_types';
import {DeleteGroupComponent} from './Component';

class DeleteGroupContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    this.state = {
      isClient: false,
      password: '',
    };
  }

  componentDidMount() {
    this.setState({
      isClient: true,
    });
  }

  deleteGroup = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {password} = this.state;
    const {sessionThunk: {data}} = this.props;

    const oneWeekFromNow = dayJS().add(1, 'week').toISOString();
    const query = data.deletionDeadline
      ? {password, deletionDeadline: null}
      : {password, deletionDeadline: oneWeekFromNow};

    this.props.patchAccountDispatch(query)
      .then(() => {
        return this.props.loginDispatch({
          // TODO account info should not live in data (profile area), move up 1 level
          username: data.login,
          password: this.state.password,
        });
      })
      .then(() => {
        return this.setState({
          password: '',
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
      <ErrorBoundary status={_.get(this.props, 'sessionThunk.error.status', 200)}>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        <DeleteGroupComponent
          {...this.state}
          deleteGroup={this.deleteGroup}
          session={this.props.sessionThunk.data}
          updateState={this.updateState}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: {session: tThunk<tSession>}) => ({
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: tLoginQuery) => dispatch(login(query)),
  patchAccountDispatch: (query: tAccountQuery) => dispatch(patchAccount(query)),
});

const DeleteGroup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteGroupContainer);

export default DeleteGroup;