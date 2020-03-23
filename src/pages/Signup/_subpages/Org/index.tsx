import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {SearchFilter} from '../../../../containers';
import {getCities, postGroup} from '../../../../redux';
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
      citySearch: '',
      handle: '',
      login: '',
      name: '',
      password: '',
      region: '',
      regionId: null,
      type: 'public' as tPrivacyEnum,
    };
  }

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const newGroup = {...this.state};
    this.props.postGroupDispatch(newGroup);
  }

  updateState = (stateKey: tStateUnion, value: string | number | object) => {
    if (typeof value === 'object') {
      this.setState(value);
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

    const handleLimiterRe = /[^a-z0-9-]/;
    const disabled = !category
      || !city
      || !cityId
      || !handle
      || !login
      || !name
      || !password
      || !region
      || !regionId
      || !type
      || handleLimiterRe.test(handle);

    return (
      <SearchFilter
        searchKey="name"
        items={this.props.citiesThunk.data}
        render={searchProps => (
          <OrgSignupComponent
            {...this.props}
            {...this.state}
            {...searchProps}
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
  postGroupDispatch: (org: tGroupQuery) => dispatch(postGroup(org)),
});

export const OrgSignup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrgSignupContainer);
