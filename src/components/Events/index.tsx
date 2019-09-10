import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {deleteEvent} from '../../redux';
import {tContainerProps} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps> {
  deleteEvent = (ev: React.MouseEvent, id: number) => {
    ev.preventDefault();
    this.props.deleteEvent({id});
  }

  render() {
    const {org} = this.props;
    // TODO having role be on the org object feels wrong somehow
    const isEditable = org.role === 'admin' || org.role === 'facilitator';

    return (
      <EventsComponent
        deleteEvent={this.deleteEvent}
        events={this.props.events}
        isEditable={isEditable}
        tiny={this.props.tiny}
      />
    );
  }
}

// TODO just handle fetching events in this generic component instead of repeating logic
const mapStateToProps = (store: any) => ({
  org: store.org.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  deleteEvent: (query: tIdQuery) => dispatch(deleteEvent(query)),
});

export const Events = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsContainer);
