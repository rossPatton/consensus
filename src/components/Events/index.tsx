import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Paginate} from '../../containers';
import {deleteEvent, getRsvps} from '../../redux';
import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    if (props.session.isAuthenticated && props.session.type === 'user') {
      this.props.getRsvpsDispatch();
    }
  }

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
            rsvps={this.props.rsvps}
            tiny={this.props.tiny}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  rsvps: store.rsvps.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getRsvpsDispatch: () => dispatch(getRsvps()),
  deleteEventDispatch: (query: tIdQuery) => dispatch(deleteEvent(query)),
});

const Events = connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
export default Events;
