import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../../containers';
import {getEvents} from '../../../../../../redux';
import {fuzzFilterList} from '../../../../../../utils';
import {tContainerProps, tState, tStore} from './_types';
import {EventsComponent} from './Component';

export class EventsContainer extends PureComponent<tContainerProps, tState> {
  constructor(props: tContainerProps) {
    super(props);

    const {match: {params: {page = 0} = {}}, org} = props;
    const offset = page ? parseInt(page, 10) : 0;

    props.getEvents({
      id: org.id,
      limit: -1,
      offset,
    });
  }

  state: tState = {
    events: this.props.events,
    isPublicFilter: null,
  };

  // re-run the filter whenever the list array or filter text changes:
  // TODO maybe memoize
  filterByPrivacy = (events: tEvent[]) => {
    if (this.state.isPublicFilter === null) return events;
    return events.filter(event => event.isPrivate === this.state.isPublicFilter);
  };

  onFilterChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    ev.preventDefault();
    const {value} = ev.currentTarget;
    const isPublicFilter = value === 'n/a' ? null : value === 'true';

    this.setState({
      isPublicFilter,
    });
  }

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

  render() {
    const eventsToRender = this.filterByPrivacy(
      this.state.events.length > 0
        ? this.state.events
        : this.props.events
    );

    return (
      <Paginate
        items={eventsToRender}
        match={this.props.match}
        render={(itemsToRender: tEvent[]) => (
          <EventsComponent
            onFilterChange={this.onFilterChange}
            onSearchChange={this.onSearchChange}
            events={itemsToRender}
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

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getEvents: (query: tIdQuery) => dispatch(getEvents(query)),
});

export const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsContainer);
