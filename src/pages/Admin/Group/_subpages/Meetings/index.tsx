import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {Helmet} from '~app/components';
import {
  ErrorBoundary,
  GenericLoader,
  PublishedFilter,
  SearchFilter,
} from '~app/containers';
import {getMeetingsByGroupId} from '~app/redux';

import {tContainerProps, tStore} from './_types';
import {MeetingsComponent} from './Component';

class MeetingsContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    const groupId = props?.sessionThunk?.data?.profile?.id;

    if (groupId) {
      const {match: {params: {page = 0} = {}}} = props;
      const offset = page ? parseInt(page, 10) : 0;

      props.getMeetingsByGroupIdDispatch({
        groupId,
        limit: -1,
        offset,
        showPast: true,
      });
    }
  }

  render() {
    const {meetingsByGroupIdThunk} = this.props;

    return (
      <ErrorBoundary status={meetingsByGroupIdThunk?.error?.status}>
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
          isLoading={meetingsByGroupIdThunk.isLoading}
          render={() => (
            <PublishedFilter
              items={meetingsByGroupIdThunk.data}
              render={publishedProps => (
                <SearchFilter
                  items={publishedProps.items}
                  render={searchProps => {
                    const meetings: ts.meeting[] = searchProps.items.filter(ev => {
                      return !ev.isDraft;
                    });
                    const drafts: ts.meeting[] = meetingsByGroupIdThunk.data.filter(ev => {
                      return ev.isDraft;
                    });

                    return (
                      <MeetingsComponent
                        {...publishedProps}
                        {...searchProps}
                        drafts={drafts}
                        meetings={meetings}
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
  meetingsByGroupIdThunk: store.meetingsByGroupId,
  sessionThunk: store.session,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getMeetingsByGroupIdDispatch: (query: ts.getMeetingQuery) =>
    dispatch(getMeetingsByGroupId(query)),
});

const Meetings = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingsContainer);

export default Meetings;
