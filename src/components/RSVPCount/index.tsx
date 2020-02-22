import _ from 'lodash';
import pluralize from 'pluralize';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {tProps, tState, tStore} from './_types';

class RSVPCount extends PureComponent<tProps, tState> {
  constructor(props: tProps) {
    super(props);

    const {rsvps} = props;
    const rsvpObj = _.find(rsvps, rsvp => rsvp.eventId === this.props.event.id);

    // only purpose for this state, is to update the UI right away
    const hasRSVPed = !!rsvpObj && rsvpObj.value !== null;

    this.state = {
      hasRSVPed,
      initialRSVP: hasRSVPed,
      rsvp: rsvpObj,
    };
  }

  render() {
    const {event} = this.props;
    const {initialRSVP, rsvp} = this.state;
    const {publicRSVPS, privateRSVPS} = event;

    // initial attendee count from server
    let rsvpCount = publicRSVPS + privateRSVPS;
    // new RSVP status (true or false) from client, if user interacted
    // undefined if user hasn't RSVPed
    const newRSVPStatus = rsvp && rsvp.type;

    // use initial vote for modifying rsvpCount
    if (initialRSVP && !newRSVPStatus) {
    // if user voted already, and un-rsvped, adjust the count down
      rsvpCount = rsvpCount - 1;
    } else if (!initialRSVP && newRSVPStatus) {
    // if user didnt rsvp, and then rsvped, adjust the count up
      rsvpCount = rsvpCount + 1;
    }

    // maybe return null???
    // if (rsvpCount === 0) return <>Be the first to RSVP</>;

    return (
      <span className="mR3">
        {rsvpCount} {pluralize('attendees', rsvpCount)}
      </span>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.rsvps.isLoading || store.event.isLoading,
  rsvps: store.rsvps.data,
  event: store.event.data,
});

export default connect(mapStateToProps, null)(RSVPCount);
