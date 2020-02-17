import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '../../../../components';
import {
  ErrorBoundary,
  GenericLoader,
  PrivacyFilter,
  SearchFilter,
} from '../../../../containers';
import {tContainerProps, tStore} from './_types';
import {EventsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
  render() {
    const {eventsByOrgIdThunk, match} = this.props;

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

            return (
              <PrivacyFilter
                items={eventsToRender}
                render={privacyProps => (
                  <SearchFilter
                    items={privacyProps.items}
                    render={searchProps => (
                      <EventsComponent
                        {...searchProps}
                        events={searchProps.items}
                        org={this.props.org}
                        role={this.props.role}
                        type={this.props.type}
                      />
                    )}
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
