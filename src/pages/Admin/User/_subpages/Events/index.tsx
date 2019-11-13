import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../containers';
import {getEventsByUser} from '../../../../../redux';
import {fuzzFilterList} from '../../../../../utils';
import {tContainerProps, tState, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);
    props.getEventsByUser();
  }

  state = {
    events: [] as tEvent[],
    privacyFilter: 'n/a' as tPrivacyFilter,
  };

  // TODO consolidate search logic somewhere
  onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const filteredList = fuzzFilterList({
      input: this.props.events || [],
      key: 'title',
      search: ev.currentTarget.value,
    });

    this.setState({
      events: filteredList,
    });
  }

  filter = (evs: tEvent[]) => {
    const {privacyFilter} = this.state;
    if (privacyFilter === 'n/a') return evs;

    const isPrivate = privacyFilter === 'private';
    return evs.filter(ev => ev.isPrivate === isPrivate);
  };

  onPrivacyFilterChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    this.setState({
      privacyFilter: ev.currentTarget.value as tPrivacyFilter,
    });
  }

  render() {
    const eventsToRender = this.filter(
      this.state.events.length > 0
        ? this.state.events
        : this.props.events,
    );

    return (
      <Paginate
        items={eventsToRender}
        page={this.props.match.params.page}
        render={(itemsToRender: tEvent[]) => (
          <EventsComponent
            events={itemsToRender}
            onPrivacyFilterChange={this.onPrivacyFilterChange}
            onSearchChange={this.onSearchChange}
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
