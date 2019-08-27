import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { notNull } from '../../utils';
import { tProps } from './_types';
import { EventsComponent } from './Component';

export class EventsContainer extends PureComponent<tProps> {
  mergeEventsWithRSVPs(events: tEvent[], session: tSession) {
    return events.map(ev => {
      // if private event, and user is not logged in, hide
      // if private event, user is logged in, but user is not a member, hide
      if (ev.isPrivate && !session.isAuthenticated) return null;
      // TODO check for roles here too

      const match = _.find(session.rsvps, rsvp => ev.id === rsvp.eventId);

      if (match && (match.status.isGoing || match.status.didAttend)) {
        return {
          ...ev,
          status: match.status,
        };
      }

      return ev;
    }).filter(notNull);
  }

  render() {
    const { events, session } = this.props;

    return (
      <EventsComponent
        events={this.mergeEventsWithRSVPs(events, session)}
        session={session}
        tiny={this.props.tiny}
      />
    );
  }
}

const mapStateToProps = (state: {session: tThunk<tSession>}) => ({
  session: state.session.data,
});

export const Events = connect(mapStateToProps)(EventsContainer);
