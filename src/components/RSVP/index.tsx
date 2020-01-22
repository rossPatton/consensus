import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {setRsvp} from '../../redux/async/rsvps';
import {tContainerProps, tSetRsvpOpts, tState, tStore} from './_types';
import {RSVPComponent} from './Component';

class RSVPContainer extends PureComponent<tContainerProps, tState> {
  static defaultProps = {
    event: {} as tEvent,
  };

  state = {
    rsvp: this.props.event.rsvp,
  };

  setRsvp = async (opts: tSetRsvpOpts) => {
    opts.ev.preventDefault();
    const {history, session} = this.props;
    const {profile = {}} = session;
    const {privateRSVP = true} = profile as tUser;

    if (!session.isAuthenticated) return history.push('/login');

    try {
      this.props.setRsvpDispatch({
        id: opts.eventId,
        rsvpType: privateRSVP ? 'private' : 'public',
        value: opts.value,
      });
    } catch (err) {
      return loglevel.error(err);
    }

    this.setState({
      rsvp: opts.value,
    });
  }

  render() {
    const {session} = this.props;
    if (session.type === 'org') return null;

    return (
      <RSVPComponent
        id={this.props.event.id}
        rsvp={this.state.rsvp}
        session={this.props.session}
        setRsvp={this.setRsvp}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  setRsvpDispatch: (query: tRSVPQuery) => dispatch(setRsvp(query)),
});

const RSVP = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RSVPContainer);

export default withRouter(RSVP);
