import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader, SearchFilter} from '~app/containers';

import {tContainerProps, tStore} from './_types';
import {MeetingsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
  render() {
    const {meetingsByGroupIdThunk, match, group, role, session} = this.props;

    return (
      <ErrorBoundary
        isSubPage
        status={meetingsByGroupIdThunk?.error?.status}>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        <GenericLoader
          isLoading={this.props.isLoading}
          render={() => {
            const type = match?.params?.section as 'drafts' | 'meetings';
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
  isLoading: store.meetingsByGroupId.isLoading,
});

const Meetings = connect(mapStateToProps)(MeetingsContainer);
export default Meetings;
