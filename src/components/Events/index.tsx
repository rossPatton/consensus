import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {deleteEvent} from '../../redux';
import {tContainerProps} from './_types';
import {EventsComponent} from './Component';

// TODO completely decouple this container from the other events pages etc
// this should be where the redux gets connected
class EventsContainer extends PureComponent<tContainerProps> {
  deleteEvent = (ev: React.MouseEvent, id: number) => {
    ev.preventDefault();
    this.props.deleteEvent({id});
  }

  render() {
    const {role} = this.props;
    const isEditable = role === 'admin' || role === 'facilitator';

    return (
      <EventsComponent
        deleteEvent={this.deleteEvent}
        events={this.props.events}
        isEditable={isEditable}
        role={role}
        tiny={this.props.tiny}
      />
    );
  }
}

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  deleteEvent: (query: tIdQuery) => dispatch(deleteEvent(query)),
});

const Events = connect(null, mapDispatchToProps)(EventsContainer);
export default Events;
