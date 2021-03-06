import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader, Template} from '~app/containers';
import {getGroup, getMeeting, getMeetingsByGroupId} from '~app/redux';
import {typesafeIdOrSlug} from '~app/utils';

import {tContainerProps, tStore} from './_types';
import {MeetingComponent} from './Component';

class MeetingContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this.dispatch();
  }

  componentDidUpdate(nextProps: tContainerProps) {
    const routeChanged = nextProps.match.url !== this.props.match.url;
    if (!routeChanged) return;
    this.dispatch();
  }

  dispatch = async () => {
    const {getMeetingDispatch, match} = this.props;
    const id = typesafeIdOrSlug(match?.params?.id);

    let res = null;
    if (typeof id === 'number') {
      try {
        res = await getMeetingDispatch({id});
      } catch (err) {
        loglevel.error(err);
      }
    }

    if (res && res.payload && res.payload.groupId) {
      try {
        this.getRestOfMeetingsByGroupId(res);
      } catch (err) {
        loglevel.error(err);
      }
    }
  }

  getRestOfMeetingsByGroupId = async (res: ts.payload<ts.meetingSingular>) => {
    await this.props.getGroupByIdDispatch({id: res.payload.groupId});

    return this.props.getMeetingsByGroupIdDispatch({
      exclude: res.payload.id,
      groupId: res.payload.groupId,
      isDraft: false,
      limit: 4,
      showPast: false,
    });
  }

  render() {
    const {
      isLoading,
      meetingThunk,
      meetingsByGroupId,
      groupThunk,
      rolesThunk,
      rsvpsThunk,
      session,
    } = this.props;

    const meetingStatus = meetingThunk?.error?.status;
    const {groupThunk: {data: group}} = this.props;

    const roleMap = rolesThunk.data.find(roleMap => {
      return roleMap.groupId === group.id;
    }) as ts.roleMap;

    let role = roleMap && roleMap.role;
    if (session.type === 'group' && session.profile.id === group.id) {
      role = 'admin';
    }

    return (
      <Template>
        <ErrorBoundary status={meetingStatus}>
          <GenericLoader
            isLoading={isLoading}
            render={() => {
              const group = groupThunk.data;
              const meeting = meetingThunk.data;

              // if user is not logged in or not a member of the group
              if (group.type === 'private') {
                const userRoleMap = _.find(
                  rolesThunk.data,
                  rm => rm.groupId === group.id,
                );

                if (!session.isAuthenticated || !userRoleMap) {
                  return <Redirect to="/login" />;
                }
              }

              const rsvp = _.find(
                rsvpsThunk.data,
                rsvp => rsvp.meetingId === meeting.id,
              );

              return (
                <>
                  <Helmet
                    canonical={`/meeting${meeting.slug}`}
                    title={`Consensus Meeting: ${meeting.title}`}
                    meta={[
                      { name: 'description', content: meeting.description },
                      { name: 'keywords', content: meeting.category },
                    ]}
                  />
                  <MeetingComponent
                    meeting={meeting}
                    meetingsByGroupId={meetingsByGroupId}
                    group={groupThunk.data}
                    role={role}
                    rsvp={rsvp}
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
  meetingThunk: store.meeting,
  isLoading: store.meeting.isLoading
    || store.session.isLoading
    || store.roles.isLoading,
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

  getGroupByIdDispatch: (query: ts.getGroupQuery) => dispatch(getGroup(query)),
});

const Meeting = connect(mapStateToProps, mapDispatchToProps)(MeetingContainer);
export default Meeting;
