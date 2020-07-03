import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import { ErrorBoundary, GenericLoader } from '~app/containers';
import { getMeetingsByGroupId, getRsvps, getUsers } from '~app/redux';
import { api } from '~app/utils';

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

  sendEmail = async () => {
    const {meetingsByGroupIdThunk, usersByGroupId} = this.props;
    const {cohort, content, meetingIndex, subject} = this.state;

    const {data: meetings} = meetingsByGroupIdThunk;
    const meeting = meetings[meetingIndex];

    console.log('meeting => ', meeting);

    let users = await Promise.all(usersByGroupId.map(user => user));

    // announce by rsvp status
    if (cohort === 'yes' || cohort === 'maybe' || cohort === 'yesmaybe') {
      const rsvps = await this.props.getRsvpsDispatch({
        meetingId: meeting.id,
      });

      console.log('rsvps => ', rsvps);

      const ids = await Promise.all(rsvps.payload.map(rsvp => rsvp.userId));
      console.log('ids => ', ids, typeof ids, ids instanceof Array);
      const usersByRsvp = await this.props.getUsersDispatch({ids});
      users = await Promise.all(usersByRsvp.payload.map(user => user));
    }

    const to = users.map(user => user.email).join(', ');

    const recipientVariables = {};
    for (const user of users) {
      // @ts-ignore
      recipientVariables[user.email] = {id: user.id};
    }

    console.log('recipientVariables => ', recipientVariables);
    console.log('to ? ', to);

    try {
      await api({
        path: '/api/v1/sendEmail',
        query: {
          content,
          from: this.props.group.name,
          recipientVariables: JSON.stringify(recipientVariables),
          subject,
          to,
          text: content,
          html: content,
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
    const {group, meetingsByGroupIdThunk} = this.props;

    return (
      <ErrorBoundary status={meetingsByGroupIdThunk?.error?.status}>
        <GenericLoader
          isLoading={meetingsByGroupIdThunk.isLoading}
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
  meetingsByGroupIdThunk: store.meetingsByGroupId,
  usersByGroupId: store.usersByGroupId.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
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
