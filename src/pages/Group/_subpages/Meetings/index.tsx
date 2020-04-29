import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader, SearchFilter} from '~app/containers';
import {getMeetingsByGroupId} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {MeetingsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    props.getMeetingsByGroupIdDispatch({
      groupId: props.group.id,
      showPast: false,
      limit: -1,
    });
  }

  render() {
    const {meetingsByGroupIdThunk, match, group, role, session} = this.props;

    return (
      <ErrorBoundary
        isSubPage
        status={meetingsByGroupIdThunk?.error?.status}>
        <Helmet
          canonical={`/group/${group.handle}`}
          title={`Consensus Group: ${group.name} Meetings`}
          meta={[
            { name: 'description', content: group.description },
            { name: 'keywords', content: `group,${group.category},meetings` },
          ]}
        />
        <GenericLoader
          isLoading={meetingsByGroupIdThunk.isLoading}
          render={() => {
            const type = match?.params?.section || 'meetings';
            const meetings = meetingsByGroupIdThunk.data;
            const meetingsToRender = type === 'meetings'
              ? meetings.filter(ev => !ev.isDraft)
              : meetings.filter(ev => ev.isDraft);

            // on server, we don't return if user isn't a member of the group
            // but we still render something to show the user they need to join
            const privateGroup = group.type !== 'public';
            const userIsLoggedIn = session.isAuthenticated;
            const userIsAMemberOfGroup = !!role && role !== 'pending';
            const hideMeetings = privateGroup
              && (!userIsLoggedIn || !userIsAMemberOfGroup);

            return (
              <SearchFilter
                items={meetingsToRender}
                render={searchProps => (
                  <MeetingsComponent
                    {...searchProps}
                    meetings={searchProps.items}
                    hideMeetings={hideMeetings}
                    group={group}
                    role={role}
                    type={type}
                  />
                )}
              />
            );
          }}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  meetingsByGroupIdThunk: store.meetingsByGroupId,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getMeetingsByGroupIdDispatch:
    (query: ts.getMeetingQuery) => dispatch(getMeetingsByGroupId(query)),
});

const Meetings = connect(mapStateToProps, mapDispatchToProps)(MeetingsContainer);
export default Meetings;
