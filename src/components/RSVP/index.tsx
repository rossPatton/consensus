import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {GenericLoader} from '../../containers';
import {patchRsvps, postRsvps} from '../../redux';
import {tContainerProps, tSetRsvpOpts, tState, tStore} from './_types';
import {RSVPComponent} from './Component';

class RSVPContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const {rsvps} = props;
    const rsvp = _.find(rsvps, rsvp => rsvp.eventId === this.props.event.id);

    // only purpose for this state, is to update the UI right away
    const hasRSVPed = !!rsvp && (rsvp.publicRSVP || rsvp.privateRSVP);

    this.state = {
      hasRSVPed,
      initialRSVP: hasRSVPed,
      rsvp,
    };
  }

  // post or patch, depending on RSVP status
  setRsvp = async (opts: tSetRsvpOpts) => {
    opts.ev.preventDefault();
    const {rsvp} = this.state;
    const {history, patchRsvpDispatch, postRsvpDispatch, session} = this.props;
    const {profile = {}} = session;
    const {privateRSVP: userRSVPsPrivately = true} = profile as tUser;

    if (!session.isAuthenticated) {
      return history.push('/login');
    }

    const method = typeof rsvp === 'undefined' ? 'POST' : 'PATCH';
    const dispatch = method === 'PATCH' ? patchRsvpDispatch : postRsvpDispatch;
    const hasRSVPed = !this.state.hasRSVPed;
    this.setState({hasRSVPed});

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
    return (
      <GenericLoader
        isLoading={this.props.isLoading}
        render={() => (
          <RSVPComponent
            event={this.props.event}
            hasRSVPed={this.state.hasRSVPed}
            initialRSVP={this.state.initialRSVP}
            rsvp={this.state.rsvp}
            session={this.props.session}
            setRsvp={this.setRsvp}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.rsvps.isLoading,
  rsvps: store.rsvps.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  patchRsvpDispatch: (query: tRSVPQuery) => dispatch(patchRsvps(query)),
  postRsvpDispatch: (query: tRSVPQuery) => dispatch(postRsvps(query)),
});

const RSVP = connect(mapStateToProps, mapDispatchToProps)(RSVPContainer);
export default withRouter(RSVP);
