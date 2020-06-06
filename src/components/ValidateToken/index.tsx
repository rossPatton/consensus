import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {loginSuccess, validateToken} from '~app/redux';

import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {ValidateTokenComponent} from './Component';

class ValidateTokenContainer extends PureComponent<tContainerProps, tState> {
  static defaultProps = {
    actionLabel: 'Email token',
  };

  state = {
    error: '',
    token: '',
  };

  validateToken = async () => {
    try {
      const session = await this.props.validateTokenDispatch({
        token: this.state.token,
      });
      await this.props.dispatch(loginSuccess(session));
      this.props.history.push('/admin/meetings');
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }
  }

  updateState = (stateKey: tKeyUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    return (
      <ValidateTokenComponent
        {...this.state}
        actionLabel={this.props.actionLabel}
        includeLegend={this.props.includeLegend}
        validateToken={this.validateToken}
        updateState={this.updateState}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  tokensThunk: store.tokens,
});

const mapDispatchToProps = (dispatch: Function) => ({
  dispatch,
  validateTokenDispatch: (query: any) => dispatch(validateToken(query)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ValidateTokenContainer);
