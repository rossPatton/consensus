import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

// import {Redirect} from 'react-router';
import {Helmet} from '../../components';
import {ErrorBoundary, GenericLoader, Template} from '../../containers';
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

  dispatch = async () => {
    const {getEventDispatch, match} = this.props;
    const {idOrSlug} = match.params;
    // org route can be reached by orgId or handle
    const isSlug = isNaN(parseInt(idOrSlug as string, 10));

    let res = null;
    try {
      if (isSlug) {
        res = await getEventDispatch({slug: idOrSlug as string});
      } else {
        res = await getEventDispatch({id: idOrSlug as number});
      }
    } catch (err) {
      loglevel.error(err);
    }

    if (res && res.payload && res.payload.orgId) {
      try {
        this.getRestOfEventsByOrgId(res);
      } catch (err) {
        loglevel.error(err);
      }
    }
  }

  getRestOfEventsByOrgId = async (res: tActionPayload<tEvent>) => {
    await this.props.getOrgByIdDispatch({id: res.payload.orgId});

    return this.props.getEventsByOrgIdDispatch({
      exclude: res.payload.orgId,
      isDraft: false,
      limit: 4,
      orgId: res.payload.orgId,
    });
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
    let isLoading = !!orgStatus
      && (orgStatus === 200 && orgThunk.isLoading)
      || eventThunk.isLoading;
    if (session.type === 'user') {
      // if user, dont start rendering til we know their role with the group
      isLoading = isLoading && !rolesThunk.fetched;
    }

    return (
      <Template>
        <ErrorBoundary status={orgStatus || eventStatus}>
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

              // if user is not logged in or not a member of the group
              if (privateGroup && (!userIsLoggedIn || !userRoleMap)) {
                return <Redirect to="/login" />;
              }

              const event = eventThunk.data;
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
      </Template>
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
  getEventDispatch: (query: tGetEventQuery) => dispatch(getEvent(query)),

  getEventsByOrgIdDispatch: (query: tGetEventQuery) =>
    dispatch(getEventsByOrgId(query)),

  getOrgByIdDispatch: (query: tOrgQuery) => dispatch(getOrg(query)),
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
});

const Event = connect(mapStateToProps, mapDispatchToProps)(EventContainer);
export default Event;
