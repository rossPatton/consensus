import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Helmet } from '../../../../components';
import { getDecisionsByOrg, getEventsByOrg, getUsersByOrg } from '../../../../redux';
import { tContainerProps, tStore } from './_types';
import { OverviewComponent } from './Component';

export class OverviewContainer extends Component<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    if (props.org.id === 0) return;

    // only show public events if user is not signed in
    const isPublic = !props.session.isAuthenticated;

    if (props.events.length > 0) return;
    props.getEventsByOrg({id: props.org.id, isPublic, limit: -1});

    if (props.decisions.length > 0) return;
    props.getDecisionsByOrg({id: props.org.id, isPublic, limit: -1});
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
        <OverviewComponent
          decisions={this.props.decisions.slice(0, 3)}
          events={this.props.events.slice(0, 3)}
          org={this.props.org}
        />
      </>
    );
  }
}

const mapStateToProps = (state: tStore) => ({
  decisions: state.decisions.data,
  events: state.events.data,
  isLoading: state.decisions.isLoading || state.events.isLoading,
  session: state.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getDecisionsByOrg: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
  getEventsByOrg: (query: tIdQuery) => dispatch(getEventsByOrg(query)),
  getUsersByOrg: (query: tIdQuery) => dispatch(getUsersByOrg(query)),
});

export const Overview = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewContainer);
