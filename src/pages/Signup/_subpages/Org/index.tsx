import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {login, postGroup} from '../../../../redux';
import {tContainerProps, tState, tStateUnion} from './_types';
import {OrgSignupComponent} from './Component';

export class OrgSignupContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    this.state = {
      category: 'Political',
      city: '',
      cityId: 0,
      handle: '',
      isClient: false,
      login: '',
      name: '',
      password: '',
      region: '',
      regionId: 0,
      showRegionField: false,
      type: 'public' as tPrivacyEnum,
    };
  }

  componentDidMount() {
    // we do this so we only disable form submit when js is available
    this.setState({
      isClient: true,
    });
  }

  onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {showRegionField, ...newGroup} = this.state;
    await this.props.postGroupDispatch(newGroup);
    await this.props.loginDispatch({
      username: newGroup.login,
      password: newGroup.password,
    });
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
      login,
      name,
      password,
      region,
      regionId,
      type,
    } = this.state;

    const disabled = !category
      || !city
      || !cityId
      || !handle
      || !login
      || !name
      || !password
      || password.length < 12
      || !region
      || !regionId
      || !type;

    return (
      <OrgSignupComponent
        {...this.props}
        {...this.state}
        disabled={disabled}
        onSubmit={this.onSubmit}
        updateState={this.updateState}
      />
    );
  }
}

const mapStateToProps = (store: {geo: tThunk<tGeo>, cities: tThunk<tCity[]>}) => ({
  geo: store.geo.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginDispatch: (query: tLoginQuery) => dispatch(login(query)),
  postGroupDispatch: (org: tGroupQuery) => dispatch(postGroup(org)),
});

export const OrgSignup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrgSignupContainer);
