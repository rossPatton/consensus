import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { tContainerProps } from './_types';
import { EventsComponent } from './Component';

// TODO this is too much nesting - maybe figure out a less verbose structure
// basically, this
// 1- gets basic org info needed for header
// 2- sets up the shared layout for all sub pages
// 3 - renders correct sub page based on react router match
export class EventsContainer extends PureComponent<tContainerProps> {
  mergeEventsWithRSVPs(events: tEvent[], session: tSession) {
    return events.map(ev => {
      const match = _.find(session.rsvps, rsvp => ev.id === rsvp.eventId);

      if (match && (match.status.isGoing || match.status.didAttend)) {
        return {
          ...ev,
          status: match.status,
        };
      }

      return ev;
    });
  }

  render() {
    const { events, session } = this.props;

    return (
      <EventsComponent
        events={this.mergeEventsWithRSVPs(events, session)}
      />
    );
  }
}

const mapStateToProps = (state: {session: tSession}) => ({session: state.session});
export const Events = connect(mapStateToProps)(EventsContainer);
