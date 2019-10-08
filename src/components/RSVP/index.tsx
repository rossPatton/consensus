import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {setRsvp} from '../../redux';
import {tContainerProps, tSetRsvpOpts, tState, tStore} from './_types';
import {RSVPComponent} from './Component';

class RSVPContainer extends PureComponent<tContainerProps, tState> {
  state = {
    // on the server, this is split between public and private
    // on the client, the user just needs to see if they've rsvp'd or not
    rsvp: this.props.event.rsvp,
  };

  setRsvp = async (opts: tSetRsvpOpts) => {
    opts.ev.preventDefault();
    const {profile = {}} = this.props.session;
    const {privateRSVP = true} = profile as tUser;

    try {
      this.props.setRsvp({
        id: opts.eventId,
        type: privateRSVP ? 'private' : 'public',
        value: opts.value,
      });
    } catch (err) {
      return console.error(err);
    }

    this.setState({
      rsvp: opts.value,
    });
  }

  render() {
    const {profile = {}} = this.props.session;
    const {privateRSVP = true} = profile as tUser;

    return (
      <RSVPComponent
        id={this.props.event.id}
        privateRSVP={privateRSVP}
        role={this.props.role}
        rsvp={this.state.rsvp}
        setRsvp={this.setRsvp}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  setRsvp: (query: {id: number, value: boolean}) => dispatch(setRsvp(query)),
});

export const RSVP = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RSVPContainer);
