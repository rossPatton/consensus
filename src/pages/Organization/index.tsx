import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getOrg, getRoles, getRsvps} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {OrganizationComponent} from './Component';

class OrganizationContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    // TODO double check re-routes and security
    // we're not redirecting after updating profile on client to private
    // also only make roles/rsvps fetch if authenticated
    const {id} = props.match.params;
    props.getOrgDispatch({id: parseInt(id, 10)})
      .then(() => {
        props.getRolesDispatch();
        return props.getRsvpsDispatch();
      })
      .catch(loglevel.error);
  }

  render() {
    const {isLoading, location, match, roles, session} = this.props;

    return (
      <ErrorBoundary status={_.get(this.props.org, 'error.status', 200)}>
        <GenericLoader
          isLoading={isLoading}
          render={() => {
            const {org: {data: org}} = this.props;

            // TODO make real
            let meta = [
              { name: 'description', content: '' },
              { name: 'keywords', content: '' },
              { property: 'og:title', content: '' },
              { property: 'og:description', content: '' },
            ];
            if (org.vetting === 'private') {
              meta = [...meta, {
                name: 'robots',
                content: 'noindex',
              }];
            }

            const roleMap = roles.find(roleMap => {
              return roleMap.orgId === org.id;
            }) as tRoleMap;

            let role = roleMap && roleMap.role;
            if (session.type === 'org' && session.profile.id === org.id) {
              role = 'admin';
            }

            const isHidden = org.vetting === 'private' && !role;

            return isHidden
              ? (
                <Redirect to="/login" />
              ) : (
                <>
                  <Helmet
                    canonical={`org/${org.id}/overview`}
                    title={`Consensus: ${org.name}`}
                    meta={meta}
                  />
                  <OrganizationComponent
                    location={location}
                    match={match}
                    org={org}
                    role={role as tRole} // unsure why this errors but should be ok?
                    session={this.props.session}
                  />
                </>
              );
          }}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.org.isLoading || store.roles.isLoading || store.session.isLoading,
  org: store.org,
  roles: store.roles.data,
  session: store.session.data,
});


const mapDispatchToProps = (dispatch: Function) => ({
  getOrgDispatch: (query: tGetOrgQuery) => dispatch(getOrg(query)),
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
});

const Organization = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationContainer);

// page level components need to be default exports for code-splitting /shrug
export default Organization;
