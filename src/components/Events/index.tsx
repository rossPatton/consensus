import {Paginate} from '@app/containers';
import {MediaContext} from '@app/context/MatchMediaProvider/_context';
import {deleteEvent} from '@app/redux';
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class EventsContainer extends PureComponent<tContainerProps> {
  static contextType = MediaContext;
  static defaultProps = {
    count: 4,
  };

  deleteEvent = (ev: React.MouseEvent, id: number) => {
    ev.preventDefault();
    this.props.deleteEventDispatch({id});
  }

  render() {
    const {
      count,
      events = [],
      sessionRole,
      showOrgName,
      showRSVPs,
      type = 'events',
    } = this.props;

    const {isMobile, isDesktop} = this.context;

    const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';
    if (events.length === 0) {
      return (
        <h2 className="fs4 p-3 text-center">
          No {type === 'events' && 'upcoming meetings!'} {type === 'drafts' && 'drafts'} {type === 'rsvps' && 'upcoming RSVPs!'}
        </h2>
      );
    }

    return (
      <Paginate
        count={count}
        items={events}
        render={(eventsToRender: tEvent[]) => (
          <EventsComponent
            deleteEvent={this.deleteEvent}
            events={eventsToRender}
            horizontal={this.props.horizontal}
            isEditable={isEditable}
            isMobile={isMobile}
            isDesktop={isDesktop}
            sessionRole={sessionRole}
            showOrgName={showOrgName}
            showRSVPs={showRSVPs}
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
