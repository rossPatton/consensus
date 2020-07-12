import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import { ErrorBoundary, GenericLoader } from '~app/containers';
import { getMeetingsByGroupId, getRsvps, getUsers, postEmail } from '~app/redux';

import { tContainerProps, tKeyUnion, tState, tStore } from './_types';
import {AnnouncerComponent} from './Component';

class AnnouncerContainer extends PureComponent<tContainerProps, tState> {
  state = {
    cohort: '',
    content: '',
    error: '',
    meetingIndex: 0,
    subject: '',
  };

  constructor(props: tContainerProps) {
    super(props);

    const {id} = props.group;
    props.getMeetingsByGroupIdDispatch({
      groupId: id,
      limit: -1,
      showPast: false,
    });
  }

  sendEmail = async (isTest = false) => {
    const {group, meetingsByGroupIdThunk, usersByGroupId} = this.props;
    const {cohort, content, meetingIndex, subject} = this.state;

    const {data: meetings} = meetingsByGroupIdThunk;
    const meeting = meetings[meetingIndex];

    let users = [] as ts.user[];

    // send test email to admin email
    if (isTest) {
      users = [{email: group.email, id: group.id}] as ts.user[];
    } else {
      // announce to all group members
      if (cohort === 'all') {
        users = await Promise.all(usersByGroupId.map(user => user));
        // announce by rsvp status
      } else if (cohort === 'yes' || cohort === 'maybe' || cohort === 'yesmaybe') {
        const rsvps = await this.props.getRsvpsDispatch({
          meetingId: meeting.id,
          value: cohort,
        });

        const ids = await Promise.all(rsvps.payload.map(rsvp => rsvp.userId));
        const usersByRsvp = await this.props.getUsersDispatch({ids});
        users = await Promise.all(usersByRsvp.payload.map(user => user));
      }
    }

    const to = users.map(user => user.email).join(', ');

    const recipientVariables = {};
    for (const user of users) {
      // @ts-ignore
      recipientVariables[user.email] = {id: user.id};
    }

    try {
      await this.props.postEmailDispatch({
        path: '/api/v1/sendEmail',
        query: {
          content,
          data: JSON.stringify(meeting),
          from: group.name,
          recipientVariables: JSON.stringify(recipientVariables),
          subject,
          template: 'announcement',
          to,
        },
      });
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }
  }

  updateState = async (key: tKeyUnion, value: string | number) =>
    this.setState({[key]: value} as Pick<tState, tKeyUnion>);

  render() {
    const {emailsThunk, group, meetingsByGroupIdThunk} = this.props;

    // you are working on the loading functionality for the emailer form

    return (
      <ErrorBoundary status={meetingsByGroupIdThunk?.error?.status}>
        <GenericLoader
          isLoading={emailsThunk.isLoading || meetingsByGroupIdThunk.isLoading}
          render={() => (
            <AnnouncerComponent
              {...this.state}
              group={group}
              meetings={meetingsByGroupIdThunk.data}
              sendEmail={this.sendEmail}
              updateState={this.updateState}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  emailsThunk: store.emails,
  meetingsByGroupIdThunk: store.meetingsByGroupId,
  usersByGroupId: store.usersByGroupId.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  postEmailDispatch: (query: any) => dispatch(postEmail(query)),
  getUsersDispatch: (query: any) => dispatch(getUsers(query)),
  getRsvpsDispatch: (query: any) => dispatch(getRsvps(query)),
  getMeetingsByGroupIdDispatch: (query: ts.getMeetingQuery) =>
    dispatch(getMeetingsByGroupId(query)),
});

const Announcer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnouncerContainer);

export default Announcer;
