import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {MediaContext} from '~app/context/MatchMediaProvider/_context';
import {patchRsvps, postRsvps} from '~app/redux';

import {tContainerProps, tSetRsvpOpts, tState, tStore} from './_types';
import {RSVPComponent} from './Component';

class RSVPContainer extends PureComponent<tContainerProps, tState> {
  static contextType = MediaContext;

  constructor(props: tContainerProps) {
    super(props);
    const {rsvps} = props;
    const rsvp = _.find(rsvps, rsvp => rsvp.eventId === this.props.event.id);

    // only purpose for this state, is to update the UI right away
    const hasRSVPed = !!rsvp && rsvp.value !== null;

    this.state = {
      hasRSVPed,
      hasMounted: false,
      rsvp,
    };
  }

  componentDidMount() {
    this.setState({
      hasMounted: true,
    });
  }

  // post or patch, depending on RSVP status
  setRsvp = async (opts: tSetRsvpOpts) => {
    opts.ev.preventDefault();

    const {rsvp} = this.state;
    const {history, patchRsvpDispatch, postRsvpDispatch, session} = this.props;
    const {profile = {}} = session;
    const {privateRSVP: userRSVPsPrivately = true} = profile as tUser;

    if (!session.isAuthenticated) return history.push('/login');

    const method = typeof rsvp === 'undefined' ? 'POST' : 'PATCH';
    const dispatch = method === 'PATCH' ? patchRsvpDispatch : postRsvpDispatch;
    const hasRSVPed = !this.state.hasRSVPed;
    this.setState({hasRSVPed});

    let {value} = opts.ev.currentTarget;
    if (method === 'PATCH') {
      // if changing rsvp, use new value.
      // else if removing rsvp (clicking same option twice), set to null
      value = opts.ev.currentTarget.value !== rsvp.value
        ? opts.ev.currentTarget.value
        : '';
    }

    try {
      dispatch({
        eventId: opts.eventId,
        type: userRSVPsPrivately ? 'private' : 'public',
        value,
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
    if (this.props.session.type === 'org') return null;
    const {isMobile, isDesktop} = this.context;

    return (
      <RSVPComponent
        className={this.props.className}
        event={this.props.event}
        hasMounted={this.state.hasMounted}
        hasRSVPed={this.state.hasRSVPed}
        isDesktop={isDesktop}
        isMobile={isMobile}
        rsvp={this.state.rsvp}
        session={this.props.session}
        setRsvp={this.setRsvp}
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
