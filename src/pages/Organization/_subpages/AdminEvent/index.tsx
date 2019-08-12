import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import dayJS from 'dayjs';

import { getDateNowAsISOStr, parseISOLocalString, parseTimeString } from '../../../../utils';
import { createEvent } from '../../../../redux';
import { getEventsByOrgSuccess } from '../../../../redux/async/getEventsByOrg/actions';
import { Helmet } from '../../../../components';
import { tContainerProps, tState, tStateUnion, tStore } from './_types';
import { AdminEventComponent } from './Component';

export class AdminEventContainer extends Component<tContainerProps, tState> {
  state = {
    category: this.props.org.category,
    date: getDateNowAsISOStr(),
    description: '',
    duration: '2',
    isPrivate: false,
    location: '',
    locationLink: '',
    time: '19:00',
    title: '',
  };

  publishEvent = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { events } = this.props;
    const { duration, time, ...restOfEvent } = this.state;

    // TODO move date manipulation logic to server
    const timeArr = parseTimeString(time);
    const date = dayJS(this.state.date).hour(timeArr[0]).minute(timeArr[1]);
    const endDate = dayJS(this.state.date).hour(timeArr[0]).minute(timeArr[1]);
    endDate.hour(endDate.hour() + parseInt(duration, 10));

    const newEv = {
      ...restOfEvent,
      // every date is stored in the db as an ISO string
      date: date.toISOString(),
      endDate: endDate.toISOString(),
      orgId: this.props.org.id,
    };

    this.props.createEvent(newEv)
      .then((newEv: tAction<'CREATE_EVENT_SUCCESS', tEvent>) => {
        if (!newEv.payload) return null;
        return getEventsByOrgSuccess([newEv.payload, ...events]);
      })
      .catch(console.error);
  }

  toggleChecked = () => {
    this.setState({
      isPrivate: !this.state.isPrivate,
    });
  }

  updateState = (stateKey: tStateUnion, ev: any) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const { session } = this.props;

    return (
      <>
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
          <AdminEventComponent
            {...this.props}
            {...this.state}
            publishEvent={this.publishEvent}
            toggleChecked={this.toggleChecked}
            updateState={this.updateState}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: tStore) => ({
  events: state.events.data,
  session: state.session,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  createEvent: (event: tState) => dispatch(createEvent(event)),
});

export const AdminEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEventContainer);
