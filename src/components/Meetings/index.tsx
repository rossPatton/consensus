import dayJS from 'dayjs';
import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Paginate} from '~app/containers';
import {MediaContext} from '~app/context';
import {deleteMeeting} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {MeetingsComponent} from './Component';

class MeetingsContainer extends Component<tContainerProps, {renderPast: boolean}> {
  static contextType = MediaContext;
  static defaultProps = {
    count: 4,
  };

  state = {
    renderPast: false,
  };

  deleteMeeting = (ev: React.MouseEvent, id: number) => {
    ev.preventDefault();
    this.props.deleteMeetingDispatch({id});
  }

  togglePast = async (renderPast = false) =>
    this.setState({
      renderPast,
    });

  render() {
    const {
      count,
      meetings,
      sessionRole,
      showGroupName,
      showPastToggle,
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

    const {renderPast} = this.state;
    const {isMobile, isDesktop} = this.context;
    const isEditable = sessionRole === 'admin' || sessionRole === 'facilitator';

    const now = dayJS();
    const pastMeetings = meetings.filter(m => dayJS(m.date).isBefore(now));
    const upcomingMeetings = meetings.filter(m => !dayJS(m.date).isBefore(now));

    // default to showing past meeting if we have meetings, but none are upcoming
    let meetingsToPaginate = renderPast ? pastMeetings : upcomingMeetings;
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
            meetingsToRender={meetingsToRender}
            horizontal={this.props.horizontal}
            isEditable={isEditable}
            isMobile={isMobile}
            isDesktop={isDesktop}
            pastMeetings={pastMeetings}
            renderPast={renderPast}
            renderPastAsFallback={renderPastAsFallback}
            sessionRole={sessionRole}
            showGroupName={showGroupName}
            showPastToggle={showPastToggle}
            showRSVPs={showRSVPs}
            togglePast={this.togglePast}
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
