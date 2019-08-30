import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getRsvps, setRsvp} from '../../redux';
import {notNull} from '../../utils';
import {tContainerProps} from './_types';
import {EventsComponent} from './Component';

export class EventsContainer extends Component<tContainerProps> {
  constructor(props: any) {
    super(props);
    props.getRsvps();
  }

  mapEvents = () => {
    const {events, role, rsvps, session} = this.props;

    return events.map(ev => {
      // if private event, and user is not logged in, hide
      // if private event, user is logged in, but user is not a member, hide
      if (ev.isPrivate && !session.isAuthenticated) return null;
      if (role === null) return null;

      const rsvpObj = _.find(
        rsvps,
        rsvp => ev.id === rsvp.eventId && rsvp.userId === session.id,
      );

      return {
        ...ev,
        rsvp: rsvpObj && rsvpObj.rsvp,
      };
    }).filter(notNull);
  }

  setRsvp = (
    ev: React.FormEvent<HTMLFormElement>,
    eventId: number,
    value: boolean) => {
    ev.preventDefault();
    console.log('setRSVP => ', eventId, value);
    this.props
      .setRsvp({
        id: eventId,
        value,
      })
      .then((res) => {
        console.log('set RSVP response client => ', res);
        return this.props.getRsvps();
      })
      .catch(console.error);
  }

  render() {
    return (
      <EventsComponent
        events={this.mapEvents()}
        setRsvp={this.setRsvp}
        session={this.props.session}
        tiny={this.props.tiny}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
  isLoading: store.rsvps.isLoading,
  role: store.role.data,
  rsvps: store.rsvps.data,
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  setRsvp: (query: any) => dispatch(setRsvp(query)),
  getRsvps: (query: any) => dispatch(getRsvps(query)),
});

export const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);
