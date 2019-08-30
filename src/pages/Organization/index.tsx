import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getOrg, getRsvps} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {OrganizationComponent} from './Component';

export class OrganizationContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getOrg(props.match.params);
  }

  render() {
    const {isLoading, location, match, org, usersByOrg} = this.props;

    return (
      <ErrorBoundary>
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
          isLoading={isLoading}
          render={() => (
            <OrganizationComponent
              location={location}
              match={match}
              org={org}
              usersByOrg={usersByOrg}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.org.isLoading,
  org: store.org.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getOrg: (params: tOrgRouteParams) => dispatch(getOrg(params)),
});

export const Organization = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationContainer);
