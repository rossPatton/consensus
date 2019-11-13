import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getOrg, getRoles, getRsvps} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {OrganizationComponent} from './Component';

class OrganizationContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getOrg(props.match.params);

    if (props.session.isAuthenticated && props.session.type === 'user') {
      props.getRoles({id: props.session.id as number});
      props.getRsvps({id: props.session.id as number});
    }
  }

  render() {
    const {isLoading, location, match, org, roles, session, usersByOrg} = this.props;

    const roleMap = roles.find(roleMap => {
      return roleMap.orgId === this.props.org.id;
    }) as tRoleMap;

    let role = roleMap && roleMap.role;
    if (session.type === 'org' && session.profile.id === org.id) {
      role = 'admin';
    }

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
              role={role as tRole} // unsure why this errors but should be ok?
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
  getRsvps: (query: tIdQuery) => dispatch(getRsvps(query)),
});

const Organization = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationContainer);

// page level components need to be default exports for code-splitting /shrug
export default Organization;
