import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {ErrorBoundary, GenericLoader, SearchFilter} from '~app/containers';

import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
  render() {
    const {meetingsByGroupIdThunk, match, group, role, session} = this.props;

    return (
      <ErrorBoundary
        isSubPage
        status={_.get(meetingsByGroupIdThunk, 'error.status', 200)}>
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
            const type = _.get(match, 'params.section', 'meetings');
            const meetings = meetingsByGroupIdThunk.data;
            const eventsToRender = type === 'meetings'
              ? meetings.filter(ev => !ev.isDraft)
              : meetings.filter(ev => ev.isDraft);

            // on server, we don't return anything if user isn't a member of the group
            // but we still render something to show the user they need to join
            const privateGroup = group.type !== 'public';
            const userIsLoggedIn = session.isAuthenticated;
            const userIsAMemberOfGroup = !!role && role !== 'pending';
            const hideMeetings = privateGroup
              && (!userIsLoggedIn || !userIsAMemberOfGroup);

            return (
              <SearchFilter
                items={eventsToRender}
                render={searchProps => (
                  <EventsComponent
                    {...searchProps}
                    originalEvents={eventsToRender}
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
