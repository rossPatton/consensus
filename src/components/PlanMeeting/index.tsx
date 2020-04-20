import dayJS from 'dayjs';
import _ from 'lodash';
import loglevel from 'loglevel';
import qs from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {Helmet} from '~app/components';
import {ErrorBoundary} from '~app/containers';
import {getEventsByOrgIdSuccess, patchEvent, postEvent} from '~app/redux';
import {parseTimeString} from '~app/utils';

import {tContainerProps, tKeyUnion, tState, tStore, tValueUnion} from './_types';
import {PlanMeetingComponent} from './Component';

// @TODO this is a sub-page of a couple routes, should this be in /components???
class PlanMeetingContainer extends Component<tContainerProps, tState> {
  state = {
    category: this.props.org.category,
    cityId: this.props.org.cityId,
    date: dayJS().toISOString(),
    description: '',
    duration: 2,
    id: null as number | null,
    isCopy: false,
    isDraft: false,
    isPrivate: this.props.org.type !== 'public',
    location: '',
    locationLink: '',
    orgName: this.props.org.name,
    time: '19:00',
    title: '',
  };

  // we use query params to populate the form when editing an event
  constructor(props: tContainerProps) {
    super(props);
    const {router: {search}} = props;
    const draft = qs.parse(search);

    if (_.isEmpty(draft)) return;

    const isPrivate = draft.isPrivate === 'true';
    const isCopy = draft.isCopy === 'true';

    // if draft is a copy (to make new event), not an edit (of existing draft or meeting)
    // then we change a few things here
    const state = {
      category: draft.category as tCategory,
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
      orgName: this.props.org.name,
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
    const date = dayJS(this.state.date).hour(timeArr[0]).minute(timeArr[1]);
    const endDate = dayJS(this.state.date).hour(timeArr[0]).minute(timeArr[1]);
    endDate.hour(endDate.hour() + dur);

    let newEvent: tEvent;
    try {
      const {patchEventDispatch, postEventDispatch} = this.props;

      // if meeting has already been saved as a draft, we will have the id
      // patch in that case, else post new meeting (initial draft save, or submit)
      const dispatch = this.state.id
        ? patchEventDispatch
        : postEventDispatch;

      const planMeeting = await dispatch({
        ...restOfEvent,
        // we submit drafts to the same table in the DB as well
        // we only want to save as draft when the user hits the save as draft button
        // we don't use state here, since we want to set this to false when publishing
        isDraft: saveAsDraft,
        // every date is stored in the db as an ISO string
        date: date.toISOString(),
        endDate: endDate.toISOString(),
        orgId: this.props.org.id as number,
      });

      newEvent = planMeeting.payload;
    } catch (err) {
      return loglevel.error('failed to save meeting to db', err);
    }

    // update redux on client side on meeting upsert success
    getEventsByOrgIdSuccess([newEvent, ...this.props.events]);

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
    const {session} = this.props;

    return (
      <ErrorBoundary
        isSubPage
        status={_.get(session, 'error.status', 200)}>
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
        {!session.isAuthenticated && <Redirect to="" />}
        {session.isAuthenticated && (
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
  events: store.eventsByOrgId.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  patchEventDispatch: (query: tUpsertEventQuery) => dispatch(patchEvent(query)),
  postEventDispatch: (query: tUpsertEventQuery) => dispatch(postEvent(query)),
});

const PlanMeeting = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlanMeetingContainer);

export default PlanMeeting;
