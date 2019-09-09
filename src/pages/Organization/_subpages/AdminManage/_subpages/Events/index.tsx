import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../../containers';
import {getEvents} from '../../../../../../redux';
import {fuzzFilterList} from '../../../../../../utils';
import {tContainerProps} from './_types';
import {EventsComponent} from './Component';

export class EventsContainer extends PureComponent<tContainerProps> {
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

  state = {
    events: this.props.events,
  };

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
            onSearchChange={this.onSearchChange}
            events={itemsToRender}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
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
