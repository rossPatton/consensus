import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getDecisionsByOrg, getEvents } from '../../../../redux';
import { Helmet } from '../../../../components';
import { OverviewComponent } from './Component';

export class OverviewContainer extends PureComponent<any> {
  constructor(props: any) {
    super(props);

    if (props.events.length > 0) return;
    props.getEvents(props.org.id);

    if (props.decisions.length > 0) return;
    props.getDecisionsByOrg({ id: props.org.id });
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

const mapStateToProps = (state: any) => ({
  decisions: state.decisions.data,
  events: state.events.data,
  isLoading: state.decisions.isLoading
    || state.events.isLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getDecisionsByOrg: (id: number) => dispatch(getDecisionsByOrg(id)),
  getEvents: (id: number) => dispatch(getEvents(id)),
});

export const Overview = connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewContainer);
