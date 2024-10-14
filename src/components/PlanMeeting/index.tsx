import dayJS from 'dayjs';
import _ from 'lodash';
import loglevel from 'loglevel';
import qs from 'qs';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { Mutable } from 'utility-types';

import { ErrorBoundary } from '~app/containers';
import { getMeeting, getMeetingsByGroupIdSuccess, patchMeeting, postMeeting } from '~app/redux';
import { parseTimeString, slugify } from '~app/utils';

import { tContainerProps, tKeyUnion, tState, tStore, tValueUnion } from './_types';
import { PlanMeetingComponent } from './Component';

class PlanMeetingContainer extends PureComponent<tContainerProps, tState> {
  state = {
    category: this.props.group.category,
    cityId: this.props.group.cityId,
    date: dayJS().toISOString(),
    description: '',
    endTime: '21:00',
    error: '',
    groupName: this.props.group.name,
    host: this.props.group.name,
    id: undefined as number | undefined,
    isCopy: false,
    isDraft: false,
    isOnline: true,
    isPrivate: this.props.group.type !== 'public',
    isPublished: false,
    location: '',
    locationLink: '',
    tag: 'Meeting' as ts.meetingTypes,
    time: '19:00',
    title: '',
  };

  async componentDidMount() {
    const { router: { search } } = this.props;
    const draft = qs.parse(search.replace('?', ''));

    if (typeof draft.id !== 'string') return;

    try {
      const res = await this.props.getMeetingDispatch({
        id: parseInt(draft.id, 10),
      });

      // remove all the post publish stuff from the event, if editing or copying
      const {
        attendees,
        created_at,
        id,
        publicRSVPS,
        rsvp,
        updated_at,
        ...payload
      } = res.payload;

      const isCopy = typeof draft.isCopy === 'string';

      // default to DB if live meeting or draft, but if we're copying, set to false
      let { isPublished } = payload;
      if (isCopy) {
        isPublished = false;
      }

      this.setState({
        ...payload,
        isPublished,
        isCopy,
      });
    } catch (err) {
      loglevel.error(err);
    }
  }

  saveAsDraft = () =>
    this.setState({
      isDraft: true,
    }, () => this.onSubmit(true));

  onSubmit = async (saveAsDraft: boolean = false) => {
    const { img } = this.props;
    const {
      date,
      endTime,
      error,
      id,
      isCopy,
      time,
      ...restOfMeeting
    } = this.state;

    const timeArr = parseTimeString(time);
    const endTimeArr = parseTimeString(endTime);
    const startDate = dayJS(date).hour(timeArr?.[0]).minute(timeArr[1]);
    const endDate = dayJS(date).hour(endTimeArr?.[0]).minute(endTimeArr[1]);

    let newMeeting: ts.meeting;
    try {
      const { patchMeetingDispatch, postMeetingDispatch } = this.props;

      const newOrUpdatedMeeting: Partial<Mutable<ts.meeting>> = {
        ...restOfMeeting,
        img,
        // we submit drafts to the same table in the DB
        // only save as draft when the user hits the save as draft button
        isDraft: saveAsDraft,
        // if clicking publish, saveAsDraft === false, so set isPublished to true
        isPublished: !saveAsDraft,
        // every date is stored in the db as an ISO string
        date: startDate.toISOString(),
        endDate: endDate.toISOString(),
        groupId: this.props.group.id as number,
        slug: slugify(restOfMeeting.title),
      };

      // if meeting has already been saved as a draft, we will have the id
      // patch in that case, else post new meeting (initial draft save, or submit)
      // you can also copy previous meeetings, so patch, but wipe id so new one can be set
      let dispatch = postMeetingDispatch;
      if (typeof id === 'number' && !isNaN(id)) {
        dispatch = patchMeetingDispatch;
        newOrUpdatedMeeting.id = id;
      }

      const planMeeting = await dispatch(newOrUpdatedMeeting);
      newMeeting = planMeeting.payload;
    } catch (error) {
      this.setState({
        error,
      });
    }

    // update redux on client side on meeting upsert success
    const { meetingsThunk } = this.props;
    getMeetingsByGroupIdSuccess([newMeeting, ...meetingsThunk.data]);

    // this will cause the preview button to render if first time submit
    this.setState({
      id: newMeeting.id,
      // to make sure the form submit area renders the correct text
      isDraft: saveAsDraft,
      isPublished: !saveAsDraft,
      slug: newMeeting.slug,
    });
  }

  updateState = (stateKey: tKeyUnion, value: tValueUnion) => {
    this.setState({
      [stateKey]: value,
    } as Pick<tState, tKeyUnion>);
  }

  render() {
    const { meetingThunk, sessionThunk } = this.props;

    return (
      <ErrorBoundary
        isSubPage
        status={sessionThunk?.error?.status}>
        {!sessionThunk.data.isAuthenticated && <Navigate to="" />}
        {sessionThunk.data.isAuthenticated && (
          <PlanMeetingComponent
            {...this.props}
            {...meetingThunk.data}
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
  img: store.uploads.data?.meetingFeaturedImage,
  meetingThunk: store.meeting,
  meetingsThunk: store.meetingsByGroupId,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getMeetingDispatch: (query: ts.getMeetingQuery) => dispatch(getMeeting(query)),
  patchMeetingDispatch: (query: ts.upsertMeetingQuery) => dispatch(patchMeeting(query)),
  postMeetingDispatch: (query: ts.upsertMeetingQuery) => dispatch(postMeeting(query)),
});

const PlanMeeting = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlanMeetingContainer);

export default PlanMeeting;
