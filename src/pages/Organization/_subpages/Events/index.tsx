import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader, Helmet} from '../../../../components';
import {ErrorBoundary} from '../../../../containers';
import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

// TODO use context for match cause passing it around everywhere is annoying
class EventsContainer extends PureComponent<tContainerProps> {
  render() {
    const {events, match} = this.props;
    const type = _.get(match, 'params.section', 'events');
    const eventsToRender = type === 'events'
      ? events.filter(ev => !ev.isDraft)
      : events.filter(ev => ev.isDraft);


    return (
      <ErrorBoundary status={_.get(this.props, 'events.error.status', 200)}>
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
            <EventsComponent
              events={eventsToRender}
              match={this.props.match}
              org={this.props.org}
              role={this.props.role}
              type={this.props.type}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  events: store.eventsByOrgId.data,
  isLoading: store.eventsByOrgId.isLoading,
});

const Events = connect(mapStateToProps)(EventsContainer);
export default Events;
