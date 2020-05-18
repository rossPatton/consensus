import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Paginate} from '~app/containers';
import {MediaContext} from '~app/context';
import {deleteEvent} from '~app/redux';
import {tContainerProps, tStore} from './_types';
import {MeetingsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
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
      meetings = [],
      sessionRole,
      showOrgName,
      showRSVPs,
      type = 'meetings',
    } = this.props;

    const {isMobile, isDesktop} = this.context;
    const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';

    if (meetings.length === 0) {
      return (
        <h2 className="fs4 p-3 text-center">
          No {type === 'meetings' && 'upcoming meetings!'} {type === 'drafts' && 'drafts'} {type === 'rsvps' && 'upcoming RSVPs!'}
        </h2>
      );
    }

    return (
      <Paginate
        count={count}
        items={meetings}
        render={(meetingsToRender: ts.meeting[]) => (
          <MeetingsComponent
            deleteEvent={this.deleteEvent}
            meetings={meetingsToRender}
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
  deleteEventDispatch: (query: ts.idQuery) => dispatch(deleteEvent(query)),
});

const Meetings = connect(mapStateToProps, mapDispatchToProps)(MeetingsContainer);
export default Meetings;
