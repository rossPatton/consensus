import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getEventsByUser} from '../../../../../redux';
import {tContainerProps} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getEventsByUser();
  }

  getSliceOfEvents = (events: tEvent[]) => {
    const newArray = [...events];

    const {match: {params: {page}}} = this.props;
    const activePage = page ? parseInt(page, 10) : 1;

    const end = activePage * 10;
    const start = end - 10;

    // -1 here because page numbers are 1 indexed, arrays are 0 indexed
    return newArray.slice(start, end - 1);
  }

  render() {
    return (
      <EventsComponent
        allEvents={this.props.events}
        eventsToRender={this.getSliceOfEvents(this.props.events)}
        match={this.props.match}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
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
