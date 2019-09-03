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

  render() {
    return (
      <EventsComponent
        events={this.props.events}
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
