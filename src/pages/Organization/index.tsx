import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../components';
import {ErrorBoundary, GenericLoader} from '../../containers';
import {getEventsByOrgId, getOrg, getRoles, getRsvps} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {OrganizationComponent} from './Component';

class OrganizationContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const id = _.get(props, 'match.params.id', null);

    if (id) props.getOrgByIdDispatch({id});
    if (id) {
      props.getEventsByOrgIdDispatch({
        orgId: id,
        showPast: false,
        limit: -1,
      });
    }

    if (!props.session.isAuthenticated) return;
    if (props.session.type === 'org') return;
    if (!props.rolesThunk.fetched) props.getRolesDispatch();
    if (!props.rsvpsThunk.fetched) props.getRsvpsDispatch();
  }

  render() {
    const {isLoading, location, match, orgThunk, rolesThunk, session} = this.props;

    return (
      <ErrorBoundary status={_.get(orgThunk, 'error.status', 200)}>
        <GenericLoader
          isLoading={isLoading}
          render={() => {
            const {orgThunk: {data: org}} = this.props;

            // TODO make real
            let meta = [
              { name: 'description', content: '' },
              { name: 'keywords', content: '' },
              { property: 'og:title', content: '' },
              { property: 'og:description', content: '' },
            ];
            if (org.type === 'invite') {
              meta = [...meta, {
                name: 'robots',
                content: 'noindex',
              }];
            }

            const roleMap = rolesThunk.data.find(roleMap => {
              return roleMap.orgId === org.id;
            }) as tRoleMap;

            let role = roleMap && roleMap.role;
            if (session.type === 'org' && session.profile.id === org.id) {
              role = 'admin';
            }

            const isHidden = org.type === 'invite' && !role;

            return isHidden
              ? (
                <Redirect to="/login" />
              ) : (
                <>
                  <Helmet
                    canonical={`org/${org.id}`}
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
  isLoading: store.org.isLoading,
  orgThunk: store.org,
  rolesThunk: store.roles,
  rsvpsThunk: store.rsvps,
  session: store.session.data,
});


const mapDispatchToProps = (dispatch: Function) => ({
  getEventsByOrgIdDispatch:
    (query: tGetEventQuery) => dispatch(getEventsByOrgId(query)),
  getOrgByIdDispatch: (query: tIdQuery) => dispatch(getOrg(query)),
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
});

const Organization = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationContainer);

// page level components need to be default exports for code-splitting /shrug
export default Organization;
