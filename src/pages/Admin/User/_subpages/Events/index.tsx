import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {PrivacyFilter, SearchFilter} from '../../../../../containers';
import {getEventsByUser} from '../../../../../redux';
import {tContainerProps, tState, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    props.getEventsByUser();
  }

  render() {
    return (
      <PrivacyFilter
        items={this.props.events}
        render={(privacyProps: any) => (
          <SearchFilter
            items={privacyProps.items}
            render={(searchProps: tSearchFilterProps) => (
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
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.events.isLoading,
  events: store.events.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventsByUser: () => dispatch(getEventsByUser()),
});

const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);

export default Events;
