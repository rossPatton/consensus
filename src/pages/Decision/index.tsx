import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../components';
import {ErrorBoundary} from '../../containers';
import {getEventById, getEvents} from '../../redux';
import {tProps, tStore} from './_types';
import {DecisionComponent} from './Component';

export class DecisionContainer extends Component<tProps> {
  constructor(props: tProps) {
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
      .catch(console.error);
  }

  componentDidUpdate(nextProps: tProps) {
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
        .catch(console.error);
    }
  }

  shouldComponentUpdate(nextProps: tProps) {
    const loadingFinished = nextProps.isLoading !== this.props.isLoading;
    const routeChanged = nextProps.match.url !== this.props.match.url;
    const eventsLoaded = nextProps.events.length !== this.props.events.length;
    return loadingFinished || routeChanged || eventsLoaded;
  }

  render() {
    console.log('event page container props => ', this.props);
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
            <DecisionComponent
              event={this.props.event}
              events={this.props.events}
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

export const Decision = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionContainer);
