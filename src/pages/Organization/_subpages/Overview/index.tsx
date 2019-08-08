import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { getDecisionsByOrg, getEventsByOrg } from '../../../../redux';
import { Helmet } from '../../../../components';
import { tContainerProps, tState } from './_types';
import { OverviewComponent } from './Component';

export class OverviewContainer extends PureComponent<tContainerProps> {
  constructor(props: tContainerProps) {
    super(props);

    if (props.events.length > 0) return;
    props.getEventsByOrg({id: props.org.id});

    if (props.decisions.length > 0) return;
    props.getDecisionsByOrg({id: props.org.id});
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

const mapStateToProps = (state: tState) => ({
  decisions: state.decisions.data,
  events: state.events.data,
  isLoading: state.decisions.isLoading || state.events.isLoading,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  getDecisionsByOrg: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
  getEventsByOrg: (query: tIdQuery) => dispatch(getEventsByOrg(query)),
});

export const Overview = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewContainer);
