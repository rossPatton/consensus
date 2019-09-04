import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {getRsvps} from '../../redux';
import {notNull} from '../../utils';
import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

export class EventsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getRsvps();
  }

  render() {
    const {events, session, tiny} = this.props;

    return (
      <EventsComponent
        events={events}
        session={session}
        tiny={tiny}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  isLoading: store.rsvps.isLoading,
  role: store.role.data,
  rsvps: store.rsvps.data,
  session: store.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getRsvps: () => dispatch(getRsvps()),
});

export const Events = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsContainer);
