import dayJS from 'dayjs';
import _ from 'lodash';
import loglevel from 'loglevel';
import qs from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {Helmet} from '..';
import {ErrorBoundary} from '../../containers';
import {postEvent} from '../../redux';
import {parseTimeString} from '../../utils';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';
import {PlanMeetingComponent} from './Component';

class PlanMeetingContainer extends Component<tContainerProps, tState> {
  state = {
    category: this.props.org.category,
    date: dayJS().toISOString(),
    description: '',
    duration: 2,
    id: null as number | null,
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
    if (!draft.id) return;

    const isPrivate = draft.isPrivate === 'true';

    this.state = {
      category: draft.category as tCategory,
      // convert UTC date with tz to local format for html5 date/time
      date: dayJS(draft.date as string).format('YYYY-MM-DD'),
      description: draft.description as string,
      duration: parseInt(draft.duration as string, 10),
      id: parseInt(draft.id as string, 10),
      isDraft: true,
      isPrivate,
      location: draft.location as string,
      locationLink: draft.locationLink as string,
      orgName: this.props.org.name,
      time: draft.time as string,
      title: draft.title as string,
    };
  }

  saveAsDraft = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    this.setState({
      isDraft: true,
    }, () => this.onSubmit(ev, true));
  }

  onSubmit = async (
    ev: React.MouseEvent<HTMLButtonElement>,
    saveAsDraft: boolean = false) => {
    ev.preventDefault();

    const {
      duration,
      time,
      ...restOfEvent
    } = this.state;

    const timeArr = parseTimeString(time);
    const dur = typeof duration === 'string' ? parseInt(duration, 10) : duration;
    const date = dayJS(this.state.date).hour(timeArr[0]).minute(timeArr[1]);
    const endDate = dayJS(this.state.date).hour(timeArr[0]).minute(timeArr[1]);
    endDate.hour(endDate.hour() + dur);

    let newEvent: tEvent;
    try {
      const planMeeting = await this.props.postEvent({
        ...restOfEvent,
        // we submit drafts to the same table in the DB as well
        isDraft: saveAsDraft,
        // every date is stored in the db as an ISO string
        date: date.toISOString(),
        endDate: endDate.toISOString(),
        orgId: this.props.org.id as number,
      });

      newEvent = planMeeting.payload;
    } catch (err) {
      return loglevel.error('failed to save event to db', err);
    }

    // update redux on client side on event upload success
    // getEventsSuccess([newEvent, ...events]);
    this.setState({
      id: newEvent.id,
    });
  }

  updateState = (stateKey: tStateUnion, value: any) => {
    this.setState({
      [stateKey]: value,
    } as Pick<tState, tStateUnion>);
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
  postEvent: (query: tUpsertEventQuery) => dispatch(postEvent(query)),
});

const PlanMeeting = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlanMeetingContainer);

export default PlanMeeting;
