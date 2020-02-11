import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../../components';
import {ErrorBoundary, GenericLoader} from '../../../../../containers';
import {patchOrg} from '../../../../../redux';
import {tContainerProps, tStateUnion, tStore} from './_types';
import {ProfileComponent} from './Component';

class ProfileContainer extends PureComponent<tContainerProps, tOrg> {
  constructor(props: tContainerProps) {
    super(props);
    const org: tOrg = _.get(this.props, 'sessionThunk.data.profile', {});
    this.state = {
      ...org,
    };
  }

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const {category, description, eventPrivacy, vetting, id} = this.state;

    this.props.patchOrgDispatch({
      category,
      description,
      eventPrivacy,
      vetting,
      id,
    });
  }

  updateState = (stateKey: tStateUnion, ev: React.ChangeEvent<any>) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tOrg, tStateUnion>);
  }

  render() {
    const {sessionThunk} = this.props;

    return (
      <ErrorBoundary status={_.get(sessionThunk, 'error.status', 200)}>
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
        <GenericLoader
          isLoading={sessionThunk.isLoading}
          render={() => (
            <ProfileComponent
              {...this.state}
              onSubmit={this.onSubmit}
              updateState={this.updateState}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  patchOrgDispatch: (query: tOrgQuery) => dispatch(patchOrg(query)),
});

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
export default Profile;
