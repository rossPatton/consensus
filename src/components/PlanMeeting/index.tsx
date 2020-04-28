import dayJS from 'dayjs';
import _ from 'lodash';
import loglevel from 'loglevel';
import qs from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {Helmet} from '~app/components';
import {ErrorBoundary} from '~app/containers';
import {getMeetingsByGroupIdSuccess, patchEvent, postMeeting} from '~app/redux';
import {parseTimeString} from '~app/utils';

import {tContainerProps, tKeyUnion, tState, tStore, tValueUnion} from './_types';
import {PlanMeetingComponent} from './Component';

// @TODO this is a sub-page of a couple routes, should this be in /components???
class PlanMeetingContainer extends Component<tContainerProps, tState> {
  state = {
    category: this.props.group.category,
    cityId: this.props.group.cityId,
    date: dayJS().toISOString(),
    description: '',
    duration: 2,
    id: null as number | null,
    isCopy: false,
    isDraft: false,
    isPrivate: this.props.group.type !== 'public',
    location: '',
    locationLink: '',
    groupName: this.props.group.name,
    time: '19:00',
    title: '',
  };

  // we use query params to populate the form when editing an meeting
  constructor(props: tContainerProps) {
    super(props);
    const {router: {search}} = props;
    const draft = qs.parse(search);

    if (_.isEmpty(draft)) return;

    const isPrivate = draft.isPrivate === 'true';
    const isCopy = draft.isCopy === 'true';

    // if draft is a copy (to make new meeting), not an edit (of existing draft or meeting)
    // then we change a few things here
    const state = {
      category: draft.category as ts.category,
      cityId: typeof draft.cityId === 'string'
        ? parseInt(draft.cityId as string, 10)
        : null,
      // convert UTC date with tz to local format for html5 date/time picker
      date: isCopy
        ? dayJS().toISOString()
        : dayJS(draft.date as string).format('YYYY-MM-DD'),
      description: draft.description as string,
      duration: isCopy ? 2 : parseInt(draft.duration as string, 10),
      id: isCopy ? null : parseInt(draft.id as string, 10),
      isCopy: isCopy,
      isDraft: true,
      isPrivate,
      location: draft.location as string,
      locationLink: draft.locationLink as string,
      groupName: this.props.group.name,
      time: isCopy ? '19:00' : draft.time as string,
      title: draft.title as string,
    };

    this.state = state;
  }

  saveAsDraft = () =>
    this.setState({
      isDraft: true,
    }, () => this.onSubmit(true));

  onSubmit = async (saveAsDraft: boolean = false) => {
    const {duration, time, ...restOfEvent} = this.state;

    const timeArr = parseTimeString(time);
    const dur = typeof duration === 'string' ? parseInt(duration, 10) : duration;
    const date = dayJS(this.state.date).hour(timeArr?.[0]).minute(timeArr[1]);
    const endDate = dayJS(this.state.date).hour(timeArr?.[0]).minute(timeArr[1]);
    endDate.hour(endDate.hour() + dur);

    let newEvent: ts.meeting;
    try {
      const {patchEventDispatch, postMeetingDispatch} = this.props;

      // if meeting has already been saved as a draft, we will have the id
      // patch in that case, else post new meeting (initial draft save, or submit)
      const dispatch = this.state.id
        ? patchEventDispatch
        : postMeetingDispatch;

      const planMeeting = await dispatch({
        ...restOfEvent,
        // we submit drafts to the same table in the DB as well
        // we only want to save as draft when the user hits the save as draft button
        // we don't use state here, since we want to set this to false when publishing
        isDraft: saveAsDraft,
        // every date is stored in the db as an ISO string
        date: date.toISOString(),
        endDate: endDate.toISOString(),
        groupId: this.props.group.id as number,
      });

      newEvent = planMeeting.payload;
    } catch (err) {
      return loglevel.error('failed to save meeting to db', err);
    }

    // update redux on client side on meeting upsert success
    getMeetingsByGroupIdSuccess([newEvent, ...this.props.meetings]);

    // this will cause the preview button to render
    this.setState({
      id: newEvent.id,
    });
  }

  updateState = (stateKey: tKeyUnion, value: tValueUnion) => {
    this.setState({
      [stateKey]: value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {group, sessionThunk} = this.props;

    return (
      <ErrorBoundary
        isSubPage
        status={sessionThunk?.error?.status}>
        <Helmet
          canonical={`/group/${group.handle}/planMeeting`}
          title=""
          meta={[
            { name: 'description', content: `Plan your next meeting with ${group.name}` },
            { name: 'keywords', content: 'plan,meeting' },
            { property: 'og:title', content: `Consensus: Plan Meeting for ${group.name}` },
            { property: 'og:description', content: `Plan your next meeting with ${group.name}` },
          ]}
        />
        {!sessionThunk.data.isAuthenticated && <Redirect to="" />}
        {sessionThunk.data.isAuthenticated && (
          <PlanMeetingComponent
            {...this.props}
            {...this.state}
            onSubmit={this.onSubmit}
            saveAsDraft={this.saveAsDraft}
            updateState={this.updateState}
          />
        )}
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  meetings: store.meetingsByGroupId.data,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  patchEventDispatch: (query: ts.upsertMeetingQuery) => dispatch(patchEvent(query)),
  postMeetingDispatch: (query: ts.upsertMeetingQuery) => dispatch(postMeeting(query)),
});

const PlanMeeting = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlanMeetingContainer);

export default PlanMeeting;
