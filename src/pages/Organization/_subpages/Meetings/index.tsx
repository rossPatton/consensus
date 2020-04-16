import {Helmet} from '@app/components';
import {ErrorBoundary, GenericLoader, SearchFilter} from '@app/containers';
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
  render() {
    const {eventsByOrgIdThunk, match, org, role, session} = this.props;

    return (
      <ErrorBoundary
        isSubPage
        status={_.get(eventsByOrgIdThunk, 'error.status', 200)}>
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
            const type = _.get(match, 'params.section', 'events');
            const events = eventsByOrgIdThunk.data;
            const eventsToRender = type === 'events'
              ? events.filter(ev => !ev.isDraft)
              : events.filter(ev => ev.isDraft);

            // on server, we don't return anything if user isn't a member of the group
            // but we still render something to show the user they need to join
            const privateGroup = org.type !== 'public';
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
                    events={searchProps.items}
                    hideMeetings={hideMeetings}
                    org={org}
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
  eventsByOrgIdThunk: store.eventsByOrgId,
  isLoading: store.eventsByOrgId.isLoading,
});

const Meetings = connect(mapStateToProps)(MeetingsContainer);
export default Meetings;
