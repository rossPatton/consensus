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
    const {events, isDashboard, sessionRole, type = 'events'} = this.props;
    const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';

    if (events.length === 0) {
      return (
        <h2 className="fs4 p4 taCtr">
          No {type === 'events' ? 'upcoming meetings!' : 'drafts'}
        </h2>
      );
    }

    return (
      <Paginate
        count={4}
        items={events}
        render={(eventsToRender: tEvent[]) => (
          <EventsComponent
            deleteEvent={this.deleteEvent}
            events={eventsToRender}
            horizontal={this.props.horizontal}
            isDashboard={isDashboard}
            isEditable={isEditable}
            sessionRole={sessionRole}
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
