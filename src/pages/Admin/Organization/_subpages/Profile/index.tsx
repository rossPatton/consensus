import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Dispatch} from 'redux';

import {Helmet} from '../../../../../components';
import {patchOrg} from '../../../../../redux';
import {tContainerProps, tStateUnion} from './_types';
import {ProfileComponent} from './Component';

export class ProfileContainer extends PureComponent<tContainerProps, tOrg> {
  state = {
    ...this.props.session.profile as tOrg,
  };

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {category, description, eventPrivacy, gate, id} = this.state;
    this.props.patchOrg({category, description, eventPrivacy, gate, id});
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

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  patchOrg: (org: any) => dispatch(patchOrg(org)),
});

export const Profile = connect(
  null,
  mapDispatchToProps
)(ProfileContainer);
