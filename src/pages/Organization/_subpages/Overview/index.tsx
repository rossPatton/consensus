import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

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
          {...this.props}
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

const mapDispatchToProps = (dispatch: Function) => ({
  getDecisionsByOrg: (query: tIdQuery) => dispatch(getDecisionsByOrg(query)),
  getEventsByOrg: (query: tIdQuery) => dispatch(getEventsByOrg(query)),
});

export const Overview = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewContainer);
