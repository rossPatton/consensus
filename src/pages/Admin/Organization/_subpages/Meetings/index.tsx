import {Helmet} from '@app/components';
import {
  ErrorBoundary,
  GenericLoader,
  PublishedFilter,
  SearchFilter,
} from '@app/containers';
import {getEventsByOrgId} from '@app/redux';
import _ from 'lodash';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {tContainerProps, tStore} from './_types';
import {MeetingsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    const orgId = _.get(props, 'sessionThunk.data.profile.id', null);

    if (orgId) {
      const {match: {params: {page = 0} = {}}} = props;
      const offset = page ? parseInt(page, 10) : 0;

      props.getEventsByOrgIdDispatch({
        orgId,
        limit: -1,
        offset,
        showPast: true,
      });
    }
  }

  render() {
    const {eventsByOrgIdThunk} = this.props;

    return (
      <ErrorBoundary status={_.get(eventsByOrgIdThunk, 'error.status', 200)}>
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
          isLoading={eventsByOrgIdThunk.isLoading}
          render={() => (
            <PublishedFilter
              items={eventsByOrgIdThunk.data}
              render={publishedProps => (
                <SearchFilter
                  items={publishedProps.items}
                  render={searchProps => {
                    const events: tEvent[] = searchProps.items.filter(ev => {
                      return !ev.isDraft;
                    });
                    const drafts: tEvent[] = eventsByOrgIdThunk.data.filter(ev => {
                      return ev.isDraft;
                    });

                    return (
                      <MeetingsComponent
                        {...publishedProps}
                        {...searchProps}
                        drafts={drafts}
                        events={events}
                        match={this.props.match}
                        onPublishedFilterChange={publishedProps.onPublishedFilterChange}
                      />
                    );
                  }}
                />
              )}
            />
          )}
        />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  eventsByOrgIdThunk: store.eventsByOrgId,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getEventsByOrgIdDispatch: (query: tGetEventQuery) =>
    dispatch(getEventsByOrgId(query)),
});

const Meetings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingsContainer);

export default Meetings;
