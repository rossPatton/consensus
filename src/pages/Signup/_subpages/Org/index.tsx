import qs from 'query-string';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {getCities, postGroup} from '../../../../redux';
import {tContainerProps, tState, tStateUnion} from './_types';
import {OrgSignupComponent} from './Component';

export class OrgSignupContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    if (!props.citiesThunk.fetched) {
      props.getCitiesDispatch();
    }

    const location = qs.parse(props.location.search.split('?')[1]);

    this.state = {
      category: 'Political',
      city: location.city as string,
      cityId: parseInt(location.cityId as string, 10),
      handle: '',
      login: '',
      name: '',
      password: '',
      region: location.region as string,
      regionId: parseInt(location.regionId as string, 10),
      type: 'public' as tPrivacyEnum,
    };
  }

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const newGroup = {...this.state};
    this.props.postGroupDispatch(newGroup);
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
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

const mapStateToProps = (store: {cities: tThunk<tCity[]>}) => ({
  citiesThunk: store.cities,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCitiesDispatch: () => dispatch(getCities()),
  postGroupDispatch: (org: tGroupQuery) => dispatch(postGroup(org)),
});

export const OrgSignup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrgSignupContainer);
