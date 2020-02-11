import _ from 'lodash';
import loglevel from 'loglevel';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../../components';
import {ErrorBoundary, GenericLoader} from '../../../../../containers';
import {PrivacyFilter, SearchFilter} from '../../../../../containers';
import {getEventsByUserId} from '../../../../../redux';
import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    const userId = _.get(props, 'sessionThunk.data.profile.id', null);
    if (userId) {
      props.getEventsByUserIdDispatch({userId})
        .catch(loglevel.error);
    }
  }

  render() {
    const {eventsByUserIdThunk} = this.props;

    return (
      <ErrorBoundary status={_.get(eventsByUserIdThunk, 'error.status', 200)}>
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
          isLoading={eventsByUserIdThunk.isLoading}
          render={() => (
            <PrivacyFilter
              items={eventsByUserIdThunk.data}
              render={privacyProps => (
                <SearchFilter
                  items={privacyProps.items}
                  render={searchProps => (
                    <EventsComponent
                      {...privacyProps}
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
  eventsByUserIdThunk: store.eventsByUserId,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventsByUserIdDispatch: (query: {userId: number}) =>
    dispatch(getEventsByUserId(query)),
});

const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);

export default Events;
