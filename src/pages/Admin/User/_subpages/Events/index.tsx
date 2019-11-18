import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {PrivacyFilter, Search} from '../../../../../containers';
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
          <Search
            items={privacyProps.items}
            render={(searchProps: any) => (
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

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getEventsByUser: () => dispatch(getEventsByUser()),
});

const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);

export default Events;
