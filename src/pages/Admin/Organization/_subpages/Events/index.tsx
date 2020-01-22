import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {PrivacyFilter, PublishedFilter, SearchFilter} from '../../../../../containers';
import {getEvents} from '../../../../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const {match: {params: {page = 0} = {}}, session} = props;
    const offset = page ? parseInt(page, 10) : 0;

    props.getEvents({
      id: session.profile.id,
      limit: -1,
      offset,
    });
  }

  render() {
    return (
      <PublishedFilter
        items={this.props.events}
        render={(publishedProps: any) => (
          <PrivacyFilter
            items={publishedProps.items}
            render={(privacyProps: any) => (
              <SearchFilter
                items={privacyProps.items}
                render={(searchProps: tSearchFilterProps) => (
                  <EventsComponent
                    {...publishedProps}
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
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  events: store.events.data,
  isLoading: store.events.isLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEvents: (query: tIdQueryC) => dispatch(getEvents(query)),
});

const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);

export default Events;
