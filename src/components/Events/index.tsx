import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Paginate} from '../../containers';
import {deleteEvent} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps> {
  deleteEvent = (ev: React.MouseEvent, id: number) => {
    ev.preventDefault();
    this.props.deleteEventDispatch({id});
  }

  render() {
    const {events, sessionRole} = this.props;
    const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';

    return (
      <Paginate
        count={4}
        items={events}
        render={(events: tEvent[]) => (
          <EventsComponent
            deleteEvent={this.deleteEvent}
            events={events}
            isEditable={isEditable}
            sessionRole={sessionRole}
            tiny={this.props.tiny}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  deleteEventDispatch: (query: tIdQuery) => dispatch(deleteEvent(query)),
});

const Events = connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
export default Events;
