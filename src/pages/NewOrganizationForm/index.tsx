import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Dispatch} from 'redux';

import {Helmet} from '../../components';
import {tContainerProps, tStateUnion, tStore} from './_types';
import {NewOrganizationComponent} from './Component';

export class NewOrganizationContainer extends Component<tContainerProps, tOrg> {
  state = {
    category: '',
    city: '',
    cityId: 0,
    country: '',
    countryId: 0,
    description: '',
    email: '',
    eventPrivacy: 'manual' as tGate,
    gate: 'manual' as tGate,
    id: 0,
    membershipTotal: 0,
    name: '',
    region: '',
    regionId: 0,
    role: 'n/a' as tRole,
    slug: '',
    username: '',
  };

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // this.props.postOrg(this.state);
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

// const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
//   patchOrg: (org: any) => dispatch(patchOrg(org)),
// });

export const NewOrganizationForm = connect(
  mapStateToProps,
  // mapDispatchToProps
)(NewOrganizationContainer);
