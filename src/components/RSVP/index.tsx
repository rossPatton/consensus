import loglevel from 'loglevel';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {patchRsvps, postRsvps} from '../../redux';
import {tContainerProps, tSetRsvpOpts, tState, tStore} from './_types';
import {RSVPComponent} from './Component';

class RSVPContainer extends Component<tContainerProps, tState> {
  static defaultProps = {
    event: {} as tEvent,
  };

  constructor(props: tContainerProps) {
    super(props);

    const {rsvp} = props;
    const method = typeof rsvp === 'undefined' ? 'POST' : 'PATCH';
    // only purpose for this state, is to update the UI right away
    const hasRSVPed = !!rsvp && (rsvp.publicRSVP || rsvp.privateRSVP);

    this.state = {
      hasRSVPed,
      initialRSVP: hasRSVPed,
      method,
      rsvp,
    };
  }

  // post or patch, depending on RSVP status
  setRsvp = async (opts: tSetRsvpOpts) => {
    opts.ev.preventDefault();
    const {method} = this.state;
    const {history, patchRsvpDispatch, postRsvpDispatch, session} = this.props;
    const {profile = {}} = session;
    const {privateRSVP: userRSVPsPrivately = true} = profile as tUser;

    if (!session.isAuthenticated) {
      return history.push('/login');
    }

    const dispatch = method === 'PATCH' ? patchRsvpDispatch : postRsvpDispatch;
    const hasRSVPed = !this.state.hasRSVPed;
    this.setState({
      hasRSVPed,
      method: hasRSVPed ? 'PATCH' : 'POST',
    });

    try {
      dispatch({
        eventId: opts.eventId,
        rsvpType: userRSVPsPrivately ? 'private' : 'public',
        value: opts.value,
      })
        .then(res => {
          return this.setState({
            rsvp: res.payload,
          });
        })
        .catch(loglevel.error);
    } catch (err) {
      return loglevel.error(err);
    }
  }

  render() {
    const {session} = this.props;
    if (session.type === 'org') return null;

    return (
      <RSVPComponent
        event={this.props.event}
        hasRSVPed={this.state.hasRSVPed}
        initialRSVP={this.state.initialRSVP}
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
  patchRsvpDispatch: (query: tRSVPQuery) => dispatch(patchRsvps(query)),
  postRsvpDispatch: (query: tRSVPQuery) => dispatch(postRsvps(query)),
});

const RSVP = connect(mapStateToProps, mapDispatchToProps)(RSVPContainer);
export default withRouter(RSVP);
