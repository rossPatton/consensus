import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {login, postGroup} from '~app/redux';

import {tContainerProps, tState, tStateUnion} from './_types';
import {GroupSignupComponent} from './Component';

export class GroupSignupContainer extends PureComponent<tContainerProps, tState> {
  state = {
    category: 'Political' as ts.category,
    city: '',
    cityId: 0,
    error: '',
    handle: '',
    name: '',
    region: '',
    regionId: 0,
    showRegionField: false,
    token: '',
    type: 'public' as ts.privacyEnum,
  };

  verifyAndRegister = async () => {
    const {showRegionField, token, ...newGroup} = this.state;
    console.log('group register state => ', this.state);

    try {
      await this.props.postGroupDispatch({
        ...newGroup,
        email: this.props.email,
      });
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }

    try {
      await this.props.loginDispatch({
        email: this.props.email,
        sessionType: 'group',
        token,
      });
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  }

  updateState = (stateKey: tStateUnion, value: string | number | object | boolean) => {
    // if making multiple changes at once, don't update at end
    if (typeof value === 'object') {
      return this.setState(value);
    }

    this.setState({
      [stateKey]: value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const {
      category,
      city,
      cityId,
      handle,
      name,
      region,
      regionId,
      type,
    } = this.state;

    console.log('group state => ', this.state);

    const disabled = !category
      || !city
      || !cityId
      || !handle
      || handle.length < 3
      || !name
      || !region
      || !regionId
      || !type;

    console.log('disabled => ', disabled);

    return (
      <>
        <Helmet
          canonical="/signup/newGroup"
          title="Start a new group on Consensus"
          meta={[
            { name: 'description', content: 'Fill our our signup form to start engaging with your membership today!' },
            { name: 'keywords', content: 'group,signup' },
          ]}
        />
        <GroupSignupComponent
          {...this.props}
          {...this.state}
          disabled={disabled}
          verifyAndRegister={this.verifyAndRegister}
          updateState={this.updateState}
        />
      </>
    );
  }
}

const mapStateToProps = (store: {geo: ts.thunk<ts.geo>}) => ({
  geo: store.geo.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: ts.loginQuery) => dispatch(login(query)),
  postGroupDispatch: (group: ts.groupUpsertQuery) => dispatch(postGroup(group)),
});

export const GroupSignup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupSignupContainer);
