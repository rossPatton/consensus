import {Helmet} from '@app/components';
import {ErrorBoundary, GenericLoader, Template} from '@app/containers';
import {getEventsByOrgId, getGroup, getRoles, getRsvps} from '@app/redux';
import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {tContainerProps, tStore} from './_types';
import {OrganizationComponent} from './Component';

class OrganizationContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const idOrSlug = _.get(props, 'match.params.idOrSlug', null);
    // org route can be reached by orgId or handle
    const isHandle = isNaN(parseInt(idOrSlug, 10));

    if (isHandle) {
      props.getGroupDispatch({handle: idOrSlug})
        .then((res: tActionPayload<tGroup>) => {
          return props.getEventsByOrgIdDispatch({
            orgId: res.payload.id,
            showPast: false,
            limit: -1,
          });
        })
        .catch(loglevel.error);
    } else {
      props.getGroupDispatch({id: idOrSlug});
      props.getEventsByOrgIdDispatch({
        orgId: idOrSlug,
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
      <Template>
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
              if (org.type === 'hidden') {
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

              const isHidden = org.type === 'hidden' && !role;

              return isHidden
                ? (
                  <Redirect to="/login" />
                ) : (
                  <>
                    <Helmet
                      canonical={`org/${org.handle}`}
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
      </Template>
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
  getGroupDispatch: (query: tGroupQuery) => dispatch(getGroup(query)),
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
});

const Organization = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizationContainer);

// page level components need to be default exports for code-splitting /shrug
export default Organization;
