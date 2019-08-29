import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setRsvp } from '../../redux';
import { notNull } from '../../utils';
import { tContainerProps } from './_types';
import { EventsComponent } from './Component';

export class EventsContainer extends PureComponent<tContainerProps> {
  hidePrivateEvents(events: tEvent[], session: tSession) {
    return events.map(ev => {
      // if private event, and user is not logged in, hide
      // if private event, user is logged in, but user is not a member, hide
      if (ev.isPrivate && !session.isAuthenticated) return null;
      // TODO check for roles here too

      return ev;
    }).filter(notNull);
  }

  setRsvp = (
    ev: React.FormEvent<HTMLFormElement>,
    eventId: number,
    value: boolean) => {
    ev.preventDefault();
    console.log('setRSVP => ', eventId, value);
    this.props.setRsvpDispatch({
      id: eventId,
      value,
    });
  }

  render() {
    const {events, session} = this.props;

    return (
      <EventsComponent
        events={this.hidePrivateEvents(events, session)}
        setRsvp={this.setRsvp}
        session={session}
        tiny={this.props.tiny}
      />
    );
  }
}

const mapStateToProps = (store: {session: tThunk<tSession>}) => ({
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  setRsvpDispatch: (query: any) => dispatch(setRsvp(query)),
});

export const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);
