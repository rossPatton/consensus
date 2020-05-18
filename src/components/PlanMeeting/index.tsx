import dayJS from 'dayjs';
import _ from 'lodash';
import loglevel from 'loglevel';
import qs from 'query-string';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {ErrorBoundary} from '~app/containers';
import {getMeetingsByGroupIdSuccess, patchEvent, postMeeting} from '~app/redux';
import {parseTimeString, slugify} from '~app/utils';

import {tContainerProps, tKeyUnion, tState, tStore, tValueUnion} from './_types';
import {PlanMeetingComponent} from './Component';

class PlanMeetingContainer extends PureComponent<tContainerProps, tState> {
  state = {
    category: this.props.group.category,
    cityId: this.props.group.cityId,
    date: dayJS().toISOString(),
    description: '',
    endTime: '21:00',
    id: undefined as number | undefined,
    isCopy: false,
    isDraft: false,
    isOnline: true,
    isPrivate: this.props.group.type !== 'public',
    location: '',
    locationLink: '',
    groupName: this.props.group.name,
    time: '19:00',
    title: '',
  };

  // we use query params to populate the form when editing or copying a meeting
  constructor(props: tContainerProps) {
    super(props);

    const {router: {search}} = props;
    const draft = qs.parse(search);

    if (_.isEmpty(draft)) return;

    const isOnline = draft.isOnline === 'true';
    const isPrivate = draft.isPrivate === 'true';
    const isCopy = draft.isCopy === 'true';

    // if draft is a copy, not an edit (of existing draft or meeting)
    // then we change a few things here
    const state = {
      ...this.state,
      category: draft.category as ts.category,
      cityId: typeof draft.cityId === 'string'
        ? parseInt(draft.cityId as string, 10)
        : null,
      // convert UTC date with tz to local format for html5 date/time picker
      date: isCopy
        ? dayJS().toISOString()
        : dayJS(draft.date as string).format('YYYY-MM-DD'),
      description: draft.description as string,
      endDate: isCopy
        ? dayJS().toISOString()
        : dayJS(draft.endDate as string).format('YYYY-MM-DD'),
      id: isCopy ? undefined : parseInt(draft.id as string, 10),
      img: draft.img as string,
      isCopy,
      isDraft: true,
      isOnline,
      isPrivate,
      location: draft.location as string,
      locationLink: draft.locationLink as string,
      groupName: this.props.group.name,
      slug: slugify(draft.title as string),
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
    const {img} = this.props;
    const {date, endTime, id, isCopy, time, ...restOfMeeting} = this.state;

    const timeArr = parseTimeString(time);
    const endTimeArr = parseTimeString(endTime);
    const startDate = dayJS(date).hour(timeArr?.[0]).minute(timeArr[1]);
    const endDate = dayJS(date).hour(endTimeArr?.[0]).minute(endTimeArr[1]);

    let newMeeting: ts.meeting;
    try {
      const {patchEventDispatch, postMeetingDispatch} = this.props;

      // if meeting has already been saved as a draft, we will have the id
      // patch in that case, else post new meeting (initial draft save, or submit)
      const dispatch = typeof id === 'number'
        ? patchEventDispatch
        : postMeetingDispatch;

      const planMeeting = await dispatch({
        ...restOfMeeting,
        img,
        // we submit drafts to the same table in the DB as well
        // we only want to save as draft when the user hits the save as draft button
        // we don't use state here, since we want to set this to false when publishing
        isDraft: saveAsDraft,
        // every date is stored in the db as an ISO string
        date: startDate.toISOString(),
        endDate: endDate.toISOString(),
        groupId: this.props.group.id as number,
        slug: slugify(restOfMeeting.title),
      });

      newMeeting = planMeeting.payload;
    } catch (err) {
      return loglevel.error('failed to save meeting to db', err);
    }

    // update redux on client side on meeting upsert success
    const {meetingsThunk} = this.props;
    getMeetingsByGroupIdSuccess([newMeeting, ...meetingsThunk.data]);

    // this will cause the preview button to render
    this.setState({
      id: newMeeting.id,
    });
  }

  updateState = (stateKey: tKeyUnion, value: tValueUnion) => {
    this.setState({
      [stateKey]: value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const {sessionThunk} = this.props;
    console.log('all props for plan meeting => ', this.props);

    return (
      <ErrorBoundary
        isSubPage
        status={sessionThunk?.error?.status}>
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
  img: store.featuredImage.data?.img,
  meetingThunk: store.meeting,
  meetingsThunk: store.meetingsByGroupId,
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
