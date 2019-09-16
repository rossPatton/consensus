import qs from 'querystring';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Dispatch} from 'redux';

import {Helmet} from '../../components';
import {postOrg} from '../../redux';
import {slugify} from '../../utils';
import {tContainerProps, tStateUnion, tStore} from './_types';
import {NewOrganizationComponent} from './Component';

export class NewOrganizationContainer extends Component<tContainerProps, tOrg> {
  constructor(props: tContainerProps) {
    super(props);

    const location = qs.parse(props.location.search.split('?')[1]);

    this.state = {
      category: '',
      city: location.city as string,
      cityId: parseInt(location.cityId as string, 10),
      country: location.country as string,
      countryId: parseInt(location.countryId as string, 10),
      description: '',
      email: '',
      eventPrivacy: 'manual' as tGate,
      gate: 'manual' as tGate,
      membershipTotal: 0,
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
    } as Pick<tOrg, tStateUnion>);
  }

  render() {
    const {session} = this.props;

    return (
      <>
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
        {!session.isAuthenticated && <Redirect to="" />}
        {session.isAuthenticated && (
          <NewOrganizationComponent
            {...this.props}
            {...this.state}
            onSubmit={this.onSubmit}
            // setImage={this.setImage}
            // toggleChecked={this.toggleChecked}
            updateState={this.updateState}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  postOrg: (org: any) => dispatch(postOrg(org)),
});

export const NewOrganizationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewOrganizationContainer);
