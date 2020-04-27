// import {Redirect} from 'react-router';
import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader, Template} from '~app/containers';
import {MediaContext} from '~app/context/MatchMediaProvider/_context';
import {getGroup, getMeeting, getMeetingsByGroupId, getRoles, getRsvps} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {EventComponent} from './Component';

class EventContainer extends PureComponent<tContainerProps> {
  static contextType = MediaContext;

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
    const {getMeetingDispatch, match} = this.props;
    const {idOrSlug} = match.params;
    // org route can be reached by groupId or handle
    const isSlug = isNaN(parseInt(idOrSlug as string, 10));

    // TODO handle this slug vs id logic in redux. make util function
    let res = null;
    try {
      if (isSlug) {
        res = await getMeetingDispatch({slug: idOrSlug as string});
      } else {
        res = await getMeetingDispatch({id: idOrSlug as number});
      }
    } catch (err) {
      loglevel.error(err);
    }

    if (res && res.payload && res.payload.groupId) {
      try {
        this.getRestOfEventsByGroupId(res);
      } catch (err) {
        loglevel.error(err);
      }
    }
  }

  getRestOfEventsByGroupId = async (res: ts.payload<ts.meetingSingular>) => {
    await this.props.getGroupByIdDispatch({id: res.payload.groupId});

    return this.props.getMeetingsByGroupIdDispatch({
      exclude: res.payload.groupId,
      isDraft: false,
      limit: 4,
      groupId: res.payload.groupId,
    });
  }

  render() {
    const {
      eventThunk,
      meetingsByGroupId,
      groupThunk,
      rolesThunk,
      rsvpsThunk,
      session,
    } = this.props;

    const {isMobile, isDesktop} = this.context;
    const eventStatus = _.get(eventThunk, 'error.status', null);
    const orgStatus = _.get(groupThunk, 'error.status', null);

    // TODO this still isn't working properly
    // bit hacky, but if meeting is private, we 401, and if id is wrong we 204
    // in both cases we want to render the error boundary instead
    // in other words, if no error and things are still loading, show loder
    let isLoading = !!orgStatus
      && (orgStatus === 200 && groupThunk.isLoading)
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
              const privateGroup = groupThunk.data.type !== 'public';
              const userIsLoggedIn = session.isAuthenticated;
              const userRoleMap = rolesThunk.fetched
              && _.find(rolesThunk.data, rm => rm.groupId === groupThunk.data.id);

              // if user is not logged in or not a member of the group
              if (privateGroup && (!userIsLoggedIn || !userRoleMap)) {
                return <Redirect to="/login" />;
              }

              const meeting = eventThunk.data;
              const rsvp = _.find(
                rsvpsThunk.data,
                rsvp => rsvp.meetingId === meeting.id,
              );

              return (
                <EventComponent
                  meeting={meeting}
                  meetingsByGroupId={meetingsByGroupId}
                  isDesktop={isDesktop}
                  isMobile={isMobile}
                  group={groupThunk.data}
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
  eventThunk: store.meeting,
  meetingsByGroupId: store.meetingsByGroupId.data,
  groupThunk: store.group,
  rolesThunk: store.roles,
  rsvpsThunk: store.rsvps,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getMeetingDispatch: (query: ts.getMeetingQuery) => dispatch(getMeeting(query)),

  getMeetingsByGroupIdDispatch: (query: ts.getMeetingQuery) =>
    dispatch(getMeetingsByGroupId(query)),

  getGroupByIdDispatch: (query: ts.groupQuery) => dispatch(getGroup(query)),
  getRolesDispatch: () => dispatch(getRoles()),
  getRsvpsDispatch: () => dispatch(getRsvps()),
});

const Meeting = connect(mapStateToProps, mapDispatchToProps)(EventContainer);
export default Meeting;
