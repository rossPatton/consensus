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
        session={this.props.session}
        tiny={this.props.tiny}
      />
    );
  }
}

// TODO just handle fetching events in this generic component instead of repeating logic
const mapStateToProps = (store: any) => ({
  org: store.org.data,
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  deleteEvent: (query: tIdQuery) => dispatch(deleteEvent(query)),
});

export const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsContainer);
