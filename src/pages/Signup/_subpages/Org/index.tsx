import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '../../../../containers';
import {getCities, login, postGroup} from '../../../../redux';
import {tContainerProps, tState, tStateUnion} from './_types';
import {OrgSignupComponent} from './Component';

export class OrgSignupContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    if (!props.citiesThunk.fetched) {
      props.getCitiesDispatch({region: props.geo.region});
    }

    this.state = {
      category: 'Political',
      city: '',
      cityId: null,
      handle: '',
      login: '',
      name: '',
      password: '',
      region: '',
      regionId: null,
      showRegionField: false,
      type: 'public' as tPrivacyEnum,
    };
  }

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {showRegionField, ...newGroup} = this.state;
    this.props.postGroupDispatch(newGroup)
      .then(() =>
        this.props.loginDispatch({
          username: newGroup.login,
          password: newGroup.password,
        }))
      .catch(loglevel.error);
  }

  updateState = (stateKey: tStateUnion, value: string | number | object | boolean) => {
    // if making multiple changes at once, don't update at end
    if (typeof value === 'object') {
      return this.setState(value);
    }

    if (stateKey === 'region'
      && typeof value === 'string'
      && value !== this.props.geo.region) {
      this.props.getCitiesDispatch({region: value});
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

    console.log('all state for group signup => ', this.state);

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
    console.log('disabled => ', disabled);

    return (
      <GenericLoader
        isLoading={this.props.citiesThunk.isLoading}
        render={() => (
          <OrgSignupComponent
            {...this.props}
            {...this.state}
            cities={this.props.citiesThunk.data}
            disabled={disabled}
            onSubmit={this.onSubmit}
            updateState={this.updateState}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: {geo: tThunk<tGeo>, cities: tThunk<tCity[]>}) => ({
  citiesThunk: store.cities,
  geo: store.geo.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCitiesDispatch: (query: any) => dispatch(getCities(query)),
  loginDispatch: (query: tLoginQuery) => dispatch(login(query)),
  postGroupDispatch: (org: tGroupQuery) => dispatch(postGroup(org)),
});

export const OrgSignup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrgSignupContainer);
