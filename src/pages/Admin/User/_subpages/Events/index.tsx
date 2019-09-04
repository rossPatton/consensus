import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {Paginate} from '../../../../../containers';
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
      <Paginate
        items={this.props.events}
        match={this.props.match}
        render={(itemsToRender: tEvent[]) => (
          <EventsComponent
            events={itemsToRender}
          />
        )}
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
