import loglevel from 'loglevel';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getEventById, getEvents} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {EventComponent} from './Component';

class EventContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const {id} = props.match.params;

    props.getEventById({id})
      .then((res: {payload: tEvent}) => {
        // for rendering the 'more by name' sidebar
        return props.getEvents({
          id: res.payload.orgId,
          exclude: id,
        });
      })
      .catch(loglevel.error);
  }

  componentDidUpdate(nextProps: tContainerProps) {
    const routeChanged = nextProps.match.url !== this.props.match.url;
    if (routeChanged) {
      const {id} = this.props.match.params;
      this.props.getEventById({id})
        .then((res: {payload: tEvent}) => {
        // for rendering the 'more by name' sidebar
          return this.props.getEvents({
            id: res.payload.orgId,
            exclude: id,
          });
        })
        .catch(loglevel.error);
    }
  }

  shouldComponentUpdate(nextProps: tContainerProps) {
    const loadingFinished = nextProps.isLoading !== this.props.isLoading;
    const routeChanged = nextProps.match.url !== this.props.match.url;
    const eventsLoaded = nextProps.events.length !== this.props.events.length;
    return loadingFinished || routeChanged || eventsLoaded;
  }

  render() {
    return (
      <ErrorBoundary>
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
            <EventComponent
              event={this.props.event}
              events={this.props.events}
              match={this.props.match}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.event.isLoading,
  event: store.event.data,
  events: store.events.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getEventById: (query: tIdQuery) => dispatch(getEventById(query)),
  getEvents: (query: tIdQuery) => dispatch(getEvents(query)),
});

const Event = connect(mapStateToProps, mapDispatchToProps)(EventContainer);
export default Event;
