import dayJS from 'dayjs';
import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Paginate} from '~app/containers';
import {MediaContext} from '~app/context';
import {deleteMeeting} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {MeetingsComponent} from './Component';

class MeetingsContainer extends Component<tContainerProps> {
  static contextType = MediaContext;
  static defaultProps = {
    count: 4,
  };

  deleteMeeting = (ev: React.MouseEvent, id: number) => {
    ev.preventDefault();
    this.props.deleteMeetingDispatch({id});
  }

  render() {
    const {
      count,
      meetings,
      publishedFilter,
      sessionRole,
      showGroupName,
      showRSVPs,
      type = 'meetings',
    } = this.props;

    if (!meetings || meetings.length === 0) {
      return (
        <h2 className="fs4 p-3 text-center">
          No {type === 'meetings' && 'meetings!'} {type === 'drafts' && 'drafts'} {type === 'rsvps' && 'RSVPs!'}
        </h2>
      );
    }

    const {isMobile, isDesktop} = this.context;
    const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';

    // by default, we render all upcoming meetings only
    const now = dayJS();
    const pastMeetings = meetings.filter(m => dayJS(m.date).isBefore(now));
    const upcomingMeetings = meetings.filter(m => !dayJS(m.date).isBefore(now));

    // but if we only have previous meetings, we render those by default instead
    let meetingsToPaginate = meetings;
    const renderPastAsFallback = pastMeetings.length > 0 && upcomingMeetings.length === 0;
    if (renderPastAsFallback) {
      meetingsToPaginate = pastMeetings;
    }

    return (
      <Paginate
        count={count}
        items={meetingsToPaginate}
        render={(meetingsToRender: ts.meeting[]) => (
          <MeetingsComponent
            deleteMeeting={this.deleteMeeting}
            horizontal={this.props.horizontal}
            isDesktop={isDesktop}
            isEditable={isEditable}
            isMobile={isMobile}
            meetingsToRender={meetingsToRender}
            pastMeetings={pastMeetings}
            publishedFilter={publishedFilter}
            renderPastAsFallback={renderPastAsFallback}
            sessionRole={sessionRole}
            showGroupName={showGroupName}
            showRSVPs={showRSVPs}
            upcomingMeetings={upcomingMeetings}
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
  deleteMeetingDispatch: (query: ts.idQuery) => dispatch(deleteMeeting(query)),
});

const Meetings = connect(mapStateToProps, mapDispatchToProps)(MeetingsContainer);
export default Meetings;
