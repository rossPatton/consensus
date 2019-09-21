import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getOrg, getRoles} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {OrganizationComponent} from './Component';

export class OrganizationContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getOrg(props.match.params);

    if (props.roles.length === 0 && props.session.isAuthenticated) {
      props.getRoles({id: props.session.id as number});
    }
  }

  render() {
    const {isLoading, location, match, org, roles, usersByOrg} = this.props;

    const roleMap = roles.find(roleMap => {
      return roleMap.orgId === this.props.org.id;
    }) || {} as tRoleMap;

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
              role={roleMap.role}
              session={this.props.session}
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
  roles: store.roles.data,
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getOrg: (params: tOrgRouteParams) => dispatch(getOrg(params)),
  getRoles: (query: tIdQuery) => dispatch(getRoles(query)),
});

export const Organization = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationContainer);
