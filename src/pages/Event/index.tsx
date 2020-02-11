import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {Helmet} from '../../components';
import {ErrorBoundary, GenericLoader} from '../../containers';
import {getEvent, getEventsByOrgId, getRsvps} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {EventComponent} from './Component';

class EventContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    this.dispatch();
    if (!props.session.isAuthenticated) return;
    if (!props.rsvpsThunk.fetched) props.getRsvpsDispatch();
  }

  componentDidUpdate(nextProps: tContainerProps) {
    const routeChanged = nextProps.match.url !== this.props.match.url;
    if (!routeChanged) return;
    this.dispatch();
  }

  dispatch() {
    const {id} = this.props.match.params;

    this.props.getEventDispatch({id})
      .then((res: tActionPayload<tEvent>) => {
        return this.props.getEventsByOrgIdDispatch({
          exclude: id,
          orgId: res.payload.orgId,
        });
      })
      .catch(loglevel.error);
  }

  render() {
    const { event, eventsByOrgId, session } = this.props;

    return (
      <ErrorBoundary status={_.get(event, 'error.status', 200)}>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        <GenericLoader
          isLoading={this.props.isLoading}
          render={() => (
            <>
              {event.data.isPrivate
                && !session.isAuthenticated
                ? (
                  <Redirect to="/login" />
                ) : (
                  <EventComponent
                    event={event.data}
                    eventsByOrgId={eventsByOrgId}
                    match={this.props.match}
                  />
                )}
            </>
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  event: store.event,
  eventsByOrgId: store.eventsByOrgId.data,
  isLoading: store.event.isLoading,
  rsvpsThunk: store.rsvps,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventDispatch: (query: tIdQuery) =>
    dispatch(getEvent(query)),
  getEventsByOrgIdDispatch: (query: tGetEventQuery) =>
    dispatch(getEventsByOrgId(query)),
  getRsvpsDispatch: () => dispatch(getRsvps()),
});

const Event = connect(mapStateToProps, mapDispatchToProps)(EventContainer);
export default Event;
