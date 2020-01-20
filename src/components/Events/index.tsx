import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../containers';
import {deleteEvent} from '../../redux';
import {tContainerProps} from './_types';
import {EventsComponent} from './Component';

// TODO completely decouple this container from the other events pages etc
// this should be where the redux gets connected
// (probably - rn we have events rendering all over the place)
class EventsContainer extends PureComponent<tContainerProps> {
  deleteEvent = (ev: React.MouseEvent, id: number) => {
    ev.preventDefault();
    this.props.deleteEventDispatch({id});
  }

  render() {
    const {events, match, role} = this.props;
    const isEditable = role === 'admin' || role === 'facilitator';

    return (
      <Paginate
        items={events}
        page={match.params.page}
        render={(events: tEvent[]) => (
          <EventsComponent
            deleteEvent={this.deleteEvent}
            events={events}
            isEditable={isEditable}
            role={role}
            tiny={this.props.tiny}
          />
        )}
      />
    );
  }
}

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  deleteEventDispatch: (query: tIdQuery) => dispatch(deleteEvent(query)),
});

const Events = connect(null, mapDispatchToProps)(EventsContainer);
export default Events;
