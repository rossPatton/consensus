import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getOrg, getRoles, getRsvps} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {OrganizationComponent} from './Component';

class OrganizationContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getOrg(props.match.params)
      .then(res => {
        return console.log('get org response => ', res);
      })
      .catch(err => console.log(err));

    if (props.session.isAuthenticated && props.session.type === 'user') {
      props.getRoles();
      props.getRsvps();
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

    // TODO make real
    let meta = [
      { name: 'description', content: '' },
      { name: 'keywords', content: '' },
      { property: 'og:title', content: '' },
      { property: 'og:description', content: '' },
    ];
    if (org.gate === 'invite') {
      meta = [...meta, {
        name: 'robots',
        content: 'noindex',
      }];
    }

    return (
      <ErrorBoundary>
        <Helmet
          canonical={`org/${org.id}/overview`}
          title={`Consensus: ${org.name}`}
          meta={meta}
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


const mapDispatchToProps = (dispatch: Function) => ({
  getOrg: (query: tOrgRouteParams) => dispatch(getOrg(query)),
  getRoles: () => dispatch(getRoles()),
  getRsvps: () => dispatch(getRsvps()),
});

const Organization = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationContainer);

// page level components need to be default exports for code-splitting /shrug
export default Organization;
