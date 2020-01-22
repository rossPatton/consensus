import qs from 'querystring';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {postOrg} from '../../../../redux';
import {slugify} from '../../../../utils';
import {tContainerProps, tState, tStateUnion} from './_types';
import {OrgSignupComponent} from './Component';

export class OrgSignupContainer extends Component<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const location = qs.parse(props.location.search.split('?')[1]);

    this.state = {
      category: 'Political Organization',
      city: location.city as string,
      cityId: parseInt(location.cityId as string, 10),
      country: location.country as string,
      countryId: parseInt(location.countryId as string, 10),
      description: '',
      email: '',
      eventPrivacy: 'manual' as tEventPrivacy,
      gate: 'manual' as tGate,
      login: '',
      name: '',
      password: '',
      region: location.region as string,
      regionId: parseInt(location.regionId as string, 10),
      slug: '',
    };
  }

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const newOrg = {
      ...this.state,
      slug: slugify(this.state.name),
    };

    this.props.postOrg(newOrg);
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    return (
      <OrgSignupComponent
        {...this.props}
        {...this.state}
        onSubmit={this.onSubmit}
        updateState={this.updateState}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  postOrg: (org: any) => dispatch(postOrg(org)),
});

export const OrgSignup = connect(
  null,
  mapDispatchToProps,
)(OrgSignupContainer);
