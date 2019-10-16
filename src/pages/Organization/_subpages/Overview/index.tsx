import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {GenericLoader, Helmet} from '../../../../components';
import {getDecisionsByOrg, getEvents, getUsersByOrg} from '../../../../redux';
import {tContainerProps, tStore} from './_types';
import {OverviewComponent} from './Component';

export class OverviewContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);
    // only show public events if user is not signed in
    const isLoggedIn = props.session.isAuthenticated;
    props.getEvents({
      id: props.org.id,
      showPast: false,
      isPublic: !isLoggedIn,
      limit: -1,
    });

    // dont show decisions at all if not logged in
    if (isLoggedIn) {
      props.getDecisionsByOrg({
        id: props.org.id,
        isClosed: false,
        limit: -1,
      });
    }
  }

  render() {
    return (
      <>
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
          render={() => (
            <OverviewComponent
              decisions={this.props.decisions.slice(0, 3)}
              events={this.props.events.slice(0, 3)}
              org={this.props.org}
              role={this.props.role}
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  decisions: store.decisions.data,
  events: store.events.data,
  isLoading: store.decisions.isLoading || store.events.isLoading,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getDecisionsByOrg: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
  getEvents: (query: tIdQuery) => dispatch(getEvents(query)),
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
});

export const Overview = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewContainer);
