import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {MediaContext} from '~app/context';
import {patchRsvps, postRsvps} from '~app/redux';

import {tContainerProps, tSetRsvpOpts, tState, tStore} from './_types';
import {RSVPComponent} from './Component';

class RSVPContainer extends PureComponent<tContainerProps, tState> {
  static contextType = MediaContext;

  constructor(props: tContainerProps) {
    super(props);
    const {rsvps} = props;
    const rsvp = _.find(rsvps, rsvp => rsvp.meetingId === this.props.meeting.id);

    this.state = {
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
    const {privateRSVP: userRSVPsPrivately = true} = profile as ts.user;

    if (!session.isAuthenticated) return history.push('/login');

    const method = typeof rsvp === 'undefined' ? 'POST' : 'PATCH';
    const dispatch = method === 'PATCH' ? patchRsvpDispatch : postRsvpDispatch;

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
        meetingId: opts.meetingId,
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
    if (this.props.session.type === 'group') return null;
    const {isMobile, isDesktop} = this.context;

    return (
      <RSVPComponent
        className={this.props.className}
        meeting={this.props.meeting}
        hasMounted={this.state.hasMounted}
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
  rsvps: store.rsvps.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  patchRsvpDispatch: (query: ts.rsvpQuery) => dispatch(patchRsvps(query)),
  postRsvpDispatch: (query: ts.rsvpQuery) => dispatch(postRsvps(query)),
});

const RSVP = connect(mapStateToProps, mapDispatchToProps)(RSVPContainer);
export default withRouter(RSVP);
