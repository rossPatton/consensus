import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../containers';
import {getEventsByUser} from '../../../../../redux';
import {fuzzFilterList} from '../../../../../utils';
import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getEventsByUser();
  }

  state = {
    events: [],
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

  render() {
    const eventsToRender = this.state.events.length > 0
      ? this.state.events
      : this.props.events;

    return (
      <Paginate
        items={eventsToRender}
        match={this.props.match}
        render={(itemsToRender: tEvent[]) => (
          <EventsComponent
            events={itemsToRender}
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

export const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsContainer);
