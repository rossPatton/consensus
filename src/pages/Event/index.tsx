import _ from 'lodash';
import loglevel from 'loglevel';
import qs from 'query-string';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

// import {Redirect} from 'react-router';
import {Helmet} from '../../components';
import {ErrorBoundary, GenericLoader} from '../../containers';
import {getEvent, getEventsByOrgId, getOrg, getRoles, getRsvps} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {EventComponent} from './Component';

// @TODO split up event and event preview page into 2 separate routes
// then just make the eventPreview route a private route. logic here is
// starting to get really convoluted and complicated
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
    const {
      eventThunk,
      eventsByOrgId,
      orgThunk,
      rolesThunk,
      rsvpsThunk,
      session,
    } = this.props;

    const eventStatus = _.get(eventThunk, 'error.status', null);
    const orgStatus = _.get(orgThunk, 'error.status', null);

    // bit hacky, but if event is private, we 401, and if id is wrong we 204
    // in both cases we want to render the error boundary instead
    // in other words, if no error and things are still loading, show loder
    let isLoading = !!orgStatus && (orgStatus === 200 && orgThunk.isLoading);
    if (session.type === 'user') {
      // if user, dont start rendering til we know their role with the group
      isLoading = isLoading && !rolesThunk.fetched;
    }

    return (
      <ErrorBoundary status={orgStatus}>
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
            const userRoleMap = rolesThunk.fetched
              && _.find(rolesThunk.data, rm => rm.orgId === orgThunk.data.id);
            const userIsAModOrAdmin = userRoleMap ?
              userRoleMap.role === 'admin' || userRoleMap.role === 'facilitator'
              : false;

            // if user is not logged in or not a member of the group
            if (privateGroup && (!userIsLoggedIn || !userRoleMap)) {
              // return <Redirect to="/login" />;
            }

            return (
              <ErrorBoundary status={eventStatus}>
                <GenericLoader
                  isLoading={eventThunk.isLoading}
                  render={() => {
                    const event = eventThunk.data;
                    // is user is logged, is a mod or admin, and this is a draft
                    // if the draft has the right query param, render, else redirect
                    if (userIsAModOrAdmin && event.isDraft) {
                      const search = _.get(this.props, 'location.search', '');
                      const queryObj = qs.parse(search);

                      if (queryObj.isPreview === '') {
                        // return <Redirect to="/login" />;
                      }
                    }

                    const rsvp = _.find(
                      rsvpsThunk.data,
                      rsvp => rsvp.eventId === event.id,
                    );

                    return (
                      <EventComponent
                        event={event}
                        eventsByOrgId={eventsByOrgId}
                        org={orgThunk.data}
                        rsvp={rsvp}
                      />
                    );
                  }}
                />
              </ErrorBoundary>
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

  getOrgByIdDispatch: (query: tOrgQuery) => dispatch(getOrg(query)),

  getRolesDispatch: () => dispatch(getRoles()),

  getRsvpsDispatch: () => dispatch(getRsvps()),
});

const Event = connect(mapStateToProps, mapDispatchToProps)(EventContainer);
export default Event;
