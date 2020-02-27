import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../components';
import {ErrorBoundary, GenericLoader} from '../../containers';
import {getEvent, getEventsByOrgId, getOrg, getRoles, getRsvps} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {EventComponent} from './Component';

class EventContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this.dispatch();
    if (!props.session.isAuthenticated) return;
    if (props.session.type === 'org') return;
    if (!props.rsvpsThunk.fetched) props.getRsvpsDispatch();
    if (!props.rolesThunk.fetched) props.getRolesDispatch();
  }

  componentDidUpdate(nextProps: tContainerProps) {
    const routeChanged = nextProps.match.url !== this.props.match.url;
    if (!routeChanged) return;
    this.dispatch();
  }

  dispatch() {
    const {id} = this.props.match.params;

    this.props.getEventDispatch({id})
      .then((res: tActionPayload<tEvent>) => {
        // if private group, might 204 here
        if (res.payload.orgId) {
          this.props.getOrgByIdDispatch({id: res.payload.orgId});

          return this.props.getEventsByOrgIdDispatch({
            exclude: id,
            isDraft: false,
            limit: 4,
            orgId: res.payload.orgId,
          });
        }

        return null;
      })
      .catch(loglevel.error);
  }

  render() {
    const {eventThunk, eventsByOrgId, orgThunk, rolesThunk, session} = this.props;
    const eventStatus = _.get(eventThunk, 'error.status', null);
    const orgStatus = _.get(orgThunk, 'error.status', null);
    const status: tStatusUnion = eventStatus || orgStatus;

    // bit hacky, but if event is private, we 401, and if id is wrong we 204
    // in both cases we want to render the error boundary instead
    const isLoading = !!status && (status === 200 && orgThunk.isLoading);

    return (
      <ErrorBoundary status={status}>
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
          render={() => {
            const privateGroup = orgThunk.data.type !== 'public';
            const userIsLoggedIn = session.isAuthenticated;
            const userIsAMemberOfGroup = rolesThunk.fetched
              && _.find(rolesThunk.data, roleMap => {
                return roleMap.orgId === orgThunk.data.id;
              });

            if (privateGroup && (!userIsLoggedIn || !userIsAMemberOfGroup)) {
              return <Redirect to="/login" />;
            }

            return (
              <GenericLoader
                isLoading={eventThunk.isLoading}
                render={() => (
                  <EventComponent
                    event={eventThunk.data}
                    eventsByOrgId={eventsByOrgId}
                    org={orgThunk.data}
                  />
                )}
              />
            );
          }}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  eventThunk: store.event,
  eventsByOrgId: store.eventsByOrgId.data,
  orgThunk: store.org,
  rolesThunk: store.roles,
  rsvpsThunk: store.rsvps,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventDispatch: (query: tIdQuery) =>
    dispatch(getEvent(query)),

  getEventsByOrgIdDispatch: (query: tGetEventQuery) =>
    dispatch(getEventsByOrgId(query)),

  getOrgByIdDispatch: (query: tIdQuery) => dispatch(getOrg(query)),

  getRolesDispatch: () => dispatch(getRoles()),

  getRsvpsDispatch: () => dispatch(getRsvps()),
});

const Event = connect(mapStateToProps, mapDispatchToProps)(EventContainer);
export default Event;
