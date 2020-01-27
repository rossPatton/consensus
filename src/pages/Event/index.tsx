import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getEvent, getEventsByOrgId} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {EventComponent} from './Component';

class EventContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const {match: {params}} = props;
    props.getEventDispatch({id: params.id})
      .then((res: tActionPayload<tEvent>) => {
        return this.props.getEventsByOrgIdDispatch({
          exclude: params.id,
          orgId: res.payload.orgId,
        });
      })
      .catch(loglevel.error);
  }

  // componentDidMount() {
  //   const {event, match: {params}} = this.props;
  //   await this.props.getEventsByOrgIdDispatch({
  //     exclude: params.id,
  //     orgId: event.data.orgId,
  //   });
  // }

  // TODO consolidate these 2 functions
  // componentDidUpdate(nextProps: tContainerProps) {
  //   const routeChanged = nextProps.match.url !== this.props.match.url;
  //   if (routeChanged) {
  //     const {id} = this.props.match.params;
  //     this.props.getEvent({id})
  //       .then((res: tAction<string, tEvent>) => {
  //         return this.getSidebarEvents({
  //           exclude: id,
  //           orgId: res.payload.id,
  //         });
  //       })
  //       .catch(loglevel.error);
  //   }
  // }

  // shouldComponentUpdate(nextProps: tContainerProps) {
  //   const loadingFinished = nextProps.isLoading !== this.props.isLoading;
  //   const routeChanged = nextProps.match.url !== this.props.match.url;
  //   const eventsLoaded = nextProps.events.length !== this.props.events.length;
  //   return loadingFinished || routeChanged || eventsLoaded;
  // }

  render() {
    const { event, session } = this.props;

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
                    eventsByOrgId={this.props.eventsByOrgId}
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
  isLoading: store.event.isLoading,
  event: store.event,
  eventsByOrgId: store.eventsByOrgId.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventDispatch: (query: tGetEventQuery) =>
    dispatch(getEvent(query)),
  getEventsByOrgIdDispatch: (query: tGetEventQuery) =>
    dispatch(getEventsByOrgId(query)),
});

const Event = connect(mapStateToProps, mapDispatchToProps)(EventContainer);
export default Event;
