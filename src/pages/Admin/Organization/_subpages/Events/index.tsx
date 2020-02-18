import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../../components';
import {
  ErrorBoundary,
  GenericLoader,
  PublishedFilter,
  SearchFilter,
} from '../../../../../containers';
import {getEventsByOrgId} from '../../../../../redux';
import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    const orgId = _.get(props, 'sessionThunk.data.profile.id', null);

    if (orgId) {
      const {match: {params: {page = 0} = {}}} = props;
      const offset = page ? parseInt(page, 10) : 0;

      props.getEventsByOrgIdDispatch({
        orgId,
        limit: -1,
        offset,
      });
    }
  }

  render() {
    const {eventsByOrgIdThunk} = this.props;

    return (
      <ErrorBoundary status={_.get(eventsByOrgIdThunk, 'error.status', 200)}>
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
          isLoading={eventsByOrgIdThunk.isLoading}
          render={() => (
            <PublishedFilter
              items={eventsByOrgIdThunk.data}
              render={publishedProps => (
                <SearchFilter
                  items={publishedProps.items}
                  render={searchProps => (
                    <EventsComponent
                      {...publishedProps}
                      {...searchProps}
                      events={searchProps.items}
                      match={this.props.match}
                    />
                  )}
                />
              )}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  eventsByOrgIdThunk: store.eventsByOrgId,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventsByOrgIdDispatch: (query: tGetEventQuery) =>
    dispatch(getEventsByOrgId(query)),
});

const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);

export default Events;
