import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {setRsvp} from '../../redux';
import {tContainerProps, tSetRsvpOpts, tState } from './_types';
import {RSVPComponent} from './Component';

class RSVPContainer extends PureComponent<tContainerProps, tState> {
  state = {
    rsvp: this.props.event.rsvp,
  };

  setRsvp = async (opts: tSetRsvpOpts) => {
    opts.ev.preventDefault();

    try {
      this.props.setRsvp({
        id: opts.eventId,
        value: opts.value,
      });
    } catch (err) {
      console.error(err);
    }

    this.setState({
      rsvp: opts.value,
    });
  }

  render() {
    return (
      <RSVPComponent
        id={this.props.event.id}
        rsvp={this.state.rsvp}
        setRsvp={this.setRsvp}
      />
    );
  }
}

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  setRsvp: (query: {id: number, value: boolean}) => dispatch(setRsvp(query)),
});

export const RSVP = connect(
  null,
  mapDispatchToProps,
)(RSVPContainer);
