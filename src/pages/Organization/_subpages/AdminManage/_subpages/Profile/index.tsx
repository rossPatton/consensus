import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {Helmet} from '../../../../../../components';
import {tContainerProps, tStateUnion, tStore} from './_types';
import {ProfileComponent} from './Component';

export class ProfileContainer extends Component<tContainerProps, tOrg> {
  state = {
    ...this.props.org,
    newPassword: '',
    password: '',
  };

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
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
          <ProfileComponent
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
//   updateOrg: (event: any) => dispatch(updateOrg(event)),
// });

export const Profile = connect(
  mapStateToProps,
  // mapDispatchToProps
)(ProfileContainer);
